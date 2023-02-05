import { DateTime, type Duration } from 'luxon';
import * as React from 'react';
import type { Post } from '~/types/posts';
import DiscordAttachment from '~/components/DiscordAttachment';
import DiscordAvatar from '~/components/DiscordAvatar';
import DiscordEmbed from '~/components/DiscordEmbed';
import ChatText from '~/components/ChatText';
import ChatReact from '~/components/ChatReact';
import './ChatMessage.css';

type OwnProps = { pauseScroll: boolean; message: Post; diffFromToday: Duration };

const ChatMessage: React.FC<OwnProps> = ({ message, diffFromToday, pauseScroll }) => {
  const { content, mentions, author, id, timestamp, attachments, reactions, embeds } = message;
  const messageCreationTime = DateTime.fromISO(timestamp as string);

  const messageRef = React.useRef<HTMLLIElement>(null);
  const [shouldDisplay, setShouldDisplay] = React.useState(false);

  React.useEffect(() => {
    if (shouldDisplay && !pauseScroll) {
      messageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [shouldDisplay, pauseScroll]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!shouldDisplay) {
      interval = setInterval(() => {
        if (messageCreationTime.minus(diffFromToday) < DateTime.now().toUTC()) {
          setShouldDisplay(true);
        }
      }, 500);
    }
    return () => clearInterval(interval);
  });

  return shouldDisplay ? (
    <li className='chat-message' ref={messageRef}>
      <DiscordAvatar
        {...author}
        avatarUrl={
          message.embeds[0]?.author?.name === 'Max Botmint III'
            ? message.embeds[0]?.author.icon_url
            : undefined
        }
      />
      <p className='message-author'>
        <b>
          {message.embeds[0]?.author?.name === 'Max Botmint III'
            ? message.embeds[0]?.author.name
            : author.username}
        </b>
        <a
          className='message-timestamp'
          target='_blank'
          rel='noopener noreferrer'
          href={`https://discord.com/channels/706414667958059078/741054155778687066/${id}`}
        >
          {messageCreationTime.toLocaleString(DateTime.DATETIME_MED)}
        </a>
      </p>
      <ChatText content={content} mentions={mentions} />
      {embeds.map((embed) => (
        <DiscordEmbed key={embed.reference_id} {...embed} />
      ))}
      {attachments.map((attachment) => (
        <DiscordAttachment key={attachment.id} {...attachment} />
      ))}
      <div className='react-list'>
        {reactions?.map((react) => (
          <ChatReact key={JSON.stringify(react.emoji)} {...react} />
        ))}
      </div>
    </li>
  ) : null;
};
export default ChatMessage;
