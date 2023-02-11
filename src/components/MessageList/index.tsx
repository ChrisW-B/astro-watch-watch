import * as React from 'react';

import type { Duration } from 'luxon';

import ChatMessage from '~/components/ChatMessage';
import type { Post } from '~/types/posts';

import './MessageList.css';

type OwnProps = {
  chatMessages: Post[];
  diffFromToday: Duration;
};

const ChatList: React.FC<OwnProps> = ({ chatMessages, diffFromToday }) => {
  const listRef = React.useRef<HTMLLIElement>(null);
  const hasScrolled = React.useRef(false);
  React.useEffect(() => {
    if (chatMessages.length && !hasScrolled.current) {
      hasScrolled.current = true;
      setTimeout(() => {
        listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 1000);
    }
  }, [chatMessages]);

  return (
    <div className='list-wrapper'>
      <ol className='message-list'>
        {chatMessages.map((message) => (
          <ChatMessage diffFromToday={diffFromToday} key={message._id} message={message} />
        ))}
        {chatMessages.length ? <li className='the-anchor' ref={listRef} /> : null}
      </ol>
    </div>
  );
};

export default ChatList;
