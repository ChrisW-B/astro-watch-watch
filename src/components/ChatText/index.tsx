import MarkdownText from '~/components/MarkdownText';

import './ChatText.css';

// import type { Mention } from '~/types/posts';

type OwnProps = {
  content: string;
  // mentions: Mention[];
};

const ChatText: React.FC<OwnProps> = ({ content }) => {
  return (
    <div className='message-text'>
      <MarkdownText>{content}</MarkdownText>
    </div>
  );
};
export default ChatText;
