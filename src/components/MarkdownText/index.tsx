import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import type { ReactMarkdownProps } from 'react-markdown/lib/complex-types';

import remarkGfm from 'remark-gfm';

import './MarkdownText.css';

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
