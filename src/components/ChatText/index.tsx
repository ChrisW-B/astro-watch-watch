import MarkdownText from '~/components/MarkdownText';
import type { Mention } from '~/types/posts';

import './ChatText.css';

type OwnProps = {
  content: string;
  mentions: Mention[];
};

const ChatText: React.FC<OwnProps> = ({ content, mentions }) => {
  const withMentions = mentions
    .reduce(
      (text, mention) => text.replaceAll(`<@!${mention.id}>`, `[@${mention.username}](#)`),
      content,
    )
    .replace(/>>>/gi, '>');

  return withMentions ? (
    <div className='message-text'>
      <MarkdownText>{withMentions}</MarkdownText>
    </div>
  ) : null;
};
export default ChatText;
