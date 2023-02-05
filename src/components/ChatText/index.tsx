import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import type { ReactMarkdownProps } from 'react-markdown/lib/complex-types';
import type { Mention } from '~/types/posts';
import remarkGfm from 'remark-gfm';
import './ChatText.css';

const ParaWithSpoilers: React.FC<Omit<ReactMarkdownProps, 'children'>> = ({ node }) => {
  const spoiledChildren = node.children.map((child) =>
    child.type === 'text'
      ? child.value.split('||').reduce(
          (newChildren, childSection, i) => [
            ...newChildren,
            i % 2 === 0 ? (
              <React.Fragment key={i}>{childSection}</React.Fragment>
            ) : (
              <span className='markdown spoiler' key={i}>
                {childSection}
              </span>
            ),
          ],
          [] as (string | JSX.Element)[],
        )
      : child.type === 'element'
      ? React.createElement(
          child.tagName,
          { ...child.properties, key: child.position?.start.column },
          <ParaWithSpoilers node={child} />,
        )
      : null,
  );

  return spoiledChildren.length ? <>{spoiledChildren}</> : null;
};

type OwnProps = {
  content: string;
  mentions: Mention[];
};

const ChatText: React.FC<OwnProps> = ({ content, mentions }) => {
  const withMentions = mentions
    .reduce((text, mention) => {
      return text.replaceAll(`<@!${mention.id}>`, `[@${mention.username}](#)`);
    }, content)
    .replace(/>>>/gi, '>')
    .replace(/`/gi, '```');

  return (
    <div className='message-text'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          blockquote: ({ node, ...props }) => (
            <blockquote className='markdown markdown-blockquote' {...props} />
          ),
          code: ({ node, ...props }) => <code className='markdown markdown-code' {...props} />,
          a: (props) => <a className='markdown markdown-anchor' {...props} />,
          p: ({ node, ...props }) => (
            <p className='markdown markdown-p' {...props}>
              <ParaWithSpoilers node={node} />
            </p>
          ),
        }}
      >
        {withMentions}
      </ReactMarkdown>
    </div>
  );
};
export default ChatText;
