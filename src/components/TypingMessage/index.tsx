import * as React from 'react';

import { DateTime, Duration } from 'luxon';

import './TypingMessage.css';

interface OwnProps {
  messagesAuthors: { authorName: string; postTime: DateTime }[];
  diffFromToday: Duration;
}

const toSentence = (arr: string[]) =>
  arr.length < 3
    ? arr.join(' and ')
    : `${arr.slice(0, -1).join(', ')}, and ${arr[arr.length - 1] ?? ''}`;

const TypingMessage: React.FC<OwnProps> = ({ messagesAuthors, diffFromToday }) => {
  const [displayedNames, updateDisplayedNames] = React.useState<string[]>([]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newNames: string[] = [];
      messagesAuthors.forEach((authorData) => {
        const diffNow = authorData.postTime
          .minus(diffFromToday)
          .diff(DateTime.now().toUTC(), 'seconds');
        if (diffNow.seconds < 5 && diffNow.seconds > 0) {
          newNames.push(authorData.authorName);
        }
        updateDisplayedNames([...new Set(newNames)]);
      });
    }, 500);
    return () => clearInterval(interval);
  });
  return (
    <p className='typing-message'>
      {displayedNames.length
        ? `${toSentence(displayedNames)} ${displayedNames.length > 1 ? 'are' : 'is'} typing...`
        : null}
    </p>
  );
};

export default TypingMessage;
