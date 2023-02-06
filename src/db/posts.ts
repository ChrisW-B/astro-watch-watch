import type { DateTime } from 'luxon';
import type { WithId } from 'mongodb';

import { getPostCollection } from '~/db/mongodb';
import type { Post } from '~/types/posts';

export const getPosts = async (time: DateTime): Promise<WithId<Post>[] | undefined> => {
  const utcTime = time.toUTC();
  const postCollection = await getPostCollection();

  const collectionQuery = {
    timestamp: {
      $gte: utcTime.minus({ minutes: 5 }).toJSDate(),
      $lte: utcTime.plus({ minutes: 15 }).toJSDate(),
    },
  };

  const contextQuery = {
    timestamp: {
      $gte: utcTime.minus({ hours: 12 }).toJSDate(),
      $lte: utcTime.minus({ minutes: 5 }).toJSDate(),
    },
  };

  const posts = postCollection.find(collectionQuery).sort({ timestamp: 1 });
  const contextPosts = postCollection.find(contextQuery).sort({ timestamp: -1 }).limit(20);

  const contextPostsArray = await contextPosts.toArray();
  const postsArray = await posts.toArray();

  return [...contextPostsArray, ...postsArray];
};
