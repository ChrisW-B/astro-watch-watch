import type { Post } from '~/types/posts';
import * as React from 'react';
import './MessageList.css';
import ChatMessage from '~/components/ChatMessage';
import type { Duration } from 'luxon';

type OwnProps = {
  chatMessages: Post[];
  diffFromToday: Duration;
};

const ChatList: React.FC<OwnProps> = ({ chatMessages, diffFromToday }) => {
  const [pauseScroll, setPauseScroll] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let isRunning: number | null = null;
    const currentRef = listRef.current;
    const listener = () => {
      // use isRunning to debounce
      if (isRunning === null) {
        isRunning = window.requestAnimationFrame(() => {
          setPauseScroll(
            (listRef.current?.scrollTop ?? 0) <
              (listRef.current?.scrollHeight ?? 0) - (listRef.current?.offsetHeight ?? 0),
          );
          isRunning = null;
        });
      }
    };
    listRef.current?.addEventListener('scroll', listener);
    return () => {
      currentRef?.removeEventListener('scroll', listener);
    };
  });

  return (
    <div className='list-wrapper' ref={listRef}>
      <ol className='message-list'>
        {chatMessages.map((message) => (
          <ChatMessage
            diffFromToday={diffFromToday}
            key={message.id}
            message={message}
            pauseScroll={pauseScroll}
          />
        ))}
      </ol>
    </div>
  );
};

export default ChatList;
