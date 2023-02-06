import type { Author } from '~/types/posts';

import './DiscordAvatar.css';

type OwnProps = Author & {
  avatarUrl?: string | undefined;
};

const DiscordAvatar: React.FC<OwnProps> = ({ id, avatar, avatarUrl }) => {
  return (
    <div
      className='avatar'
      aria-hidden='true'
      style={
        {
          '--bg-image': avatarUrl
            ? `url(${avatarUrl})`
            : `url('https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=80')`,
        } as React.CSSProperties
      }
    />
  );
};

export default DiscordAvatar;
