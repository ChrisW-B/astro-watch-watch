import type React from 'react';

import MarkdownText from '~/components/MarkdownText';
import type { Embed } from '~/types/posts';
import discordColor from '~/utils/discordColor';

import './DiscordEmbed.css';

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
      <MarkdownText>{description}</MarkdownText>
    </blockquote>
  );
};
export default DiscordEmbed;
