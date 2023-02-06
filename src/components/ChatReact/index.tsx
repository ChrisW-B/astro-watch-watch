import * as React from 'react';

import type { Reaction } from '~/types/posts';

import './ChatReact.css';

const minDelay = 250;
const maxDelay = 2000;

const ChatReact: React.FC<Reaction> = ({ emoji, count }) => {
  const [fakeCount, setFakeCount] = React.useState(1);

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

  return (
    <div className='reaction'>
      {!emoji.id ? (
        <p>
          {emoji.name} <span className='react-count'>{fakeCount}</span>
        </p>
      ) : (
        <>
          <img
            className='emoji-img'
            src={`https://cdn.discordapp.com/emojis/${emoji.id}.webp?size=32&quality=lossless`}
          />
          <p>
            <span className='react-count'>{fakeCount}</span>
          </p>
        </>
      )}
    </div>
  );
};

export default ChatReact;
