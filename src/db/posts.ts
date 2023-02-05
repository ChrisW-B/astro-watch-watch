import type { DateTime } from 'luxon';
import { getPostCollection } from '~/db/mongodb';
import type { WithId } from 'mongodb';
import type { Post } from '~/types/posts';

export const getPosts = async (time: DateTime): Promise<WithId<Post>[] | undefined> => {
  const utcTime = time.toUTC();
  const postCollection = await getPostCollection();

  const posts = postCollection
    .find({
      timestamp: {
        $gte: utcTime.minus({ minutes: 5 }).toJSDate(),
        $lte: utcTime.plus({ minutes: 15 }).toJSDate(),
      },
    })
    .sort({ timestamp: 1 });
  const postsArray = await posts.toArray();

  return postsArray;
};
