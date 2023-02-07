import * as React from 'react';

import { DateTime } from 'luxon';
// eslint-disable-next-line no-duplicate-imports
import type { Duration } from 'luxon';

import ChatReact from '~/components/ChatReact';
import ChatText from '~/components/ChatText';
import DiscordAttachment from '~/components/DiscordAttachment';
import DiscordAvatar from '~/components/DiscordAvatar';
import DiscordEmbed from '~/components/DiscordEmbed';
import type { Post } from '~/types/posts';

import './ChatMessage.css';

type OwnProps = { message: Post; diffFromToday: Duration };

const ChatMessage: React.FC<OwnProps> = ({ message, diffFromToday }) => {
  const { content, mentions, author, id, timestamp, attachments, reactions, embeds } = message;
  const messageCreationTime = DateTime.fromISO(timestamp as string);

  const messageRef = React.useRef<HTMLLIElement>(null);
  const [shouldDisplay, setShouldDisplay] = React.useState(false);

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
      {embeds.map((embed, index) => (
        <DiscordEmbed key={embed.id ?? index} {...embed} />
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
