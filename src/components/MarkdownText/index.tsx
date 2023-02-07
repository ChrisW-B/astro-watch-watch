import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import type { ReactMarkdownProps } from 'react-markdown/lib/complex-types';
import reactStringReplace from 'react-string-replace';

import remarkGfm from 'remark-gfm';

import './MarkdownText.css';

const getReactUrl = (reactId: string) =>
  `https://cdn.discordapp.com/emojis/${reactId}.webp?size=32&quality=lossless`;

// <:spacer:829388559034875904>
const addInlineReacts = (text: string): React.ReactNode => {
  const match = text.match(/(<:[\w_-]+:\d+?>)/gi);
  if (match) {
    return reactStringReplace(text, /(<:[\w_-]+:\d+?>)/gi, (match, i) => {
      const reactParts = match.match(/<(:[\w_-]+:)(\d+)>/i);
      if (reactParts) {
        const [, reactName, reactId] = reactParts;
        return (
          <img
            arial-label={reactName}
            className='emoji'
            key={`${reactName ?? ''}${i}`}
            src={getReactUrl(reactId ?? '')}
          />
        );
      }
      return text;
    });
  }
  return text;
};

const ParaWithSpoilers: React.FC<Omit<ReactMarkdownProps, 'children'>> = ({ node }) => {
  const spoiledChildren = node.children.map((child) =>
    child.type === 'text'
      ? child.value.split('||').reduce(
          (newChildren, childSection, i) => [
            ...newChildren,
            i % 2 === 0 ? (
              <React.Fragment key={i}>{addInlineReacts(childSection)}</React.Fragment>
            ) : (
              <span className='markdown spoiler' key={i}>
                {addInlineReacts(childSection)}
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
  children: string;
};

const MarkdownText: React.FC<OwnProps> = ({ children }) => {
  return (
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
      {children.replace(/\n/gi, '\n\n')}
    </ReactMarkdown>
  );
};

export default MarkdownText;
