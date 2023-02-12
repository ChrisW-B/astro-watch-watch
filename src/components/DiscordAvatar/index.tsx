import type { Author } from '~/types/posts';

import './DiscordAvatar.css';

type OwnProps = Author & {
  avatarUrl?: string | undefined;
};

const DiscordAvatar: React.FC<OwnProps> = ({ avatar }) => {
  return (
    <div className='avatar' aria-hidden='true'>
      <img src={avatar} />
    </div>
  );
};

export default DiscordAvatar;
