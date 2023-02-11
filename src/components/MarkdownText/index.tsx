import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';

import './MarkdownText.css';

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
        p: ({ node, ...props }) => <p className='markdown markdown-p' {...props} />,
        img: ({ node, ...props }) => <img {...props} className='markdown markdown-img' />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default MarkdownText;
