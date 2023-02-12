import * as React from 'react';

import type { Reaction } from '~/types/posts';

import './ChatReact.css';

const minDelay = 250;
const maxDelay = 2000;

const ChatReact: React.FC<Reaction> = ({ src, count }) => {
  const [reacted, setReacted] = React.useState(false);
  const [fakeCount, setFakeCount] = React.useState(0);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runInterval = () => {
      const timeoutFunction = () => {
        setFakeCount((c) => {
          if (c < count) {
            runInterval();
            return c + 1;
          }
          return c;
        });
      };
      const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
      timeout = setTimeout(timeoutFunction, delay);
    };

    runInterval();
    return () => clearTimeout(timeout);
  }, []);

  return fakeCount ? (
    <button
      className={`reaction ${reacted ? 'active' : ''}`}
      onClick={() => setReacted((reacted) => !reacted)}
    >
      <img className='emoji-img' src={src} />
      <p>
        <span className='react-count'>{fakeCount + (reacted ? 1 : 0)}</span>
      </p>
    </button>
  ) : null;
};

export default ChatReact;
