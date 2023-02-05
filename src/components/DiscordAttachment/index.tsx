import type { Attachment } from '~/types/posts';
import './DiscordAttachment.css';

const DiscordAttachment: React.FC<Attachment> = ({ url, width, height, filename }) => {
  return (
    <div
      className='attachment'
      style={
        {
          '--attachment-width': width,
          '--attachment-height': height,
        } as React.CSSProperties
      }
    >
      <img className='attachment-image' alt={filename} src={url} />
    </div>
  );
};

export default DiscordAttachment;
