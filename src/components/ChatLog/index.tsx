import * as React from 'react';
import { DateTime, Duration } from 'luxon';
import type { Post } from '~/types/posts';
import MessageList from '~/components/MessageList';
import TypingMessage from '~/components/TypingMessage';

type OwnProps = {
  startTime: string;
  astroUrl: string;
};

const useChatLog = (astroUrl: string, startTime: DateTime) => {
  const [chatLog, setChatLog] = React.useState<Map<string, Post>>(new Map());
  const initDate = React.useRef(DateTime.now());

  const cleanUpOldPosts = (timeSinceStart: Duration) => {
    setChatLog(
      (log) =>
        new Map(
          [...log].filter(([, post]) => {
            const timestamp = DateTime.fromISO(post.timestamp.toString());
            const timeProgression = startTime.minus(timeSinceStart.plus({ minutes: 5 }));
            return timestamp > timeProgression;
          }),
        ),
    );
  };
  const fetchNewPosts = async (timeSinceStart: Duration) => {
    const fetchUri = `${astroUrl}/api/posts?time=${startTime.minus(timeSinceStart).toISO()}`;

    const newPosts = await fetch(fetchUri);
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
      cleanUpOldPosts(timeSinceStart);
    }, 15 * 60 * 1000);

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
