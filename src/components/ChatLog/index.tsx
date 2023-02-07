import * as React from 'react';

import { DateTime, Duration } from 'luxon';

import MessageList from '~/components/MessageList';
import TypingMessage from '~/components/TypingMessage';
import type { Post } from '~/types/posts';

type OwnProps = {
  startTime: string;
  astroUrl: string;
};

const useChatLog = (astroUrl: string, startTime: DateTime) => {
  const [chatLog, setChatLog] = React.useState<Map<string, Post>>(new Map());
  const initDate = React.useRef(DateTime.now());

  const cleanUpOldPosts = () => {
    setChatLog((log) => new Map([...log].filter((_, index) => index > 20)));
  };
  const fetchNewPosts = async (timeSinceStart: Duration) => {
    const fetchUrl = new URL(`${astroUrl}/api/posts`);
    fetchUrl.searchParams.append('time', startTime.minus(timeSinceStart).toISO());

    const newPosts = await fetch(fetchUrl);
    const json = (await newPosts.json()) as Post[];

    setChatLog((log) => {
      const newLog = new Map();
      json.forEach((post) => newLog.set(post.id, post));
      return new Map([...log, ...newLog]);
    });
  };

  React.useEffect(() => {
    void fetchNewPosts(initDate.current.diffNow());

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const interval = setInterval(async () => {
      const timeSinceStart = initDate.current.diffNow();
      await fetchNewPosts(timeSinceStart);
      cleanUpOldPosts();
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return [...chatLog]
    .map(([, post]) => post)
    .sort(
      (a, b) =>
        DateTime.fromISO(a.timestamp.toString()).toMillis() -
        DateTime.fromISO(b.timestamp.toString()).toMillis(),
    );
};

const ChatLog: React.FC<OwnProps> = ({ astroUrl, startTime }) => {
  const log = useChatLog(astroUrl, DateTime.fromISO(startTime));
  const timeSinceStart = React.useRef(DateTime.fromISO(startTime).diffNow());

  return (
    <>
      <MessageList chatMessages={log} diffFromToday={timeSinceStart.current} />
      <TypingMessage
        diffFromToday={timeSinceStart.current}
        messagesAuthors={log.map((chat) => ({
          authorName: chat.author.username,
          postTime: DateTime.fromISO(chat.timestamp.toString()),
        }))}
      />
    </>
  );
};

export default ChatLog;
