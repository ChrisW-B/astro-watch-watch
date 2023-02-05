import type React from 'react';
import type { Embed } from '~/types/posts';
import './DiscordEmbed.css';
import discordColor from '~/utils/discordColor';

const DiscordEmbed: React.FC<Embed> = ({ description, color }) => {
  return (
    <blockquote
      className='discord-embed'
      style={
        {
          '--accent-color': discordColor(color),
        } as React.CSSProperties
      }
    >
      {description}
    </blockquote>
  );
};
export default DiscordEmbed;
