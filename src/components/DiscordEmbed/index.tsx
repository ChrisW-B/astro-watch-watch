import type React from 'react';

import MarkdownText from '~/components/MarkdownText';
import type { Embed } from '~/types/posts';
import discordColor from '~/utils/discordColor';

import './DiscordEmbed.css';

const DiscordEmbed: React.FC<Embed> = ({
  description,
  title,
  color,
  footer,
  fields,
  type,
  video,
  thumbnail,
}) => {
  return (
    <blockquote
      className='discord-embed'
      style={
        {
          '--accent-color': discordColor(color),
        } as React.CSSProperties
      }
    >
      {title ? <MarkdownText>{title}</MarkdownText> : null}
      {type === 'gifv' ? (
        <video
          poster={thumbnail?.proxy_url}
          src={video.url}
          loop
          preload=''
          width={video.width}
          height={video.height}
          autoPlay
          controls
        />
      ) : null}
      {description ? <MarkdownText>{description}</MarkdownText> : null}
      {fields?.length ? (
        <div className='field-grid'>
          {fields.map((field) => (
            <div key={field.name} className={`field ${field.inline ? '' : 'span'}`}>
              <MarkdownText>{`**${field.name}**\n${field.value}`}</MarkdownText>
            </div>
          ))}
        </div>
      ) : null}
      {footer?.text ? <MarkdownText>{footer.text}</MarkdownText> : null}
    </blockquote>
  );
};
export default DiscordEmbed;
