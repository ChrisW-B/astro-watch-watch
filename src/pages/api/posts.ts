import type { APIRoute } from 'astro';
import { DateTime } from 'luxon';
import { getPosts } from '~/db/posts';

export const get: APIRoute = async ({ url }) => {
  const searchTime = url.searchParams.get('time');
  const time = DateTime.fromISO(searchTime ?? '');
  const posts = await getPosts(time);
  if (!posts) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  return new Response(JSON.stringify(posts), {
    status: 200,
  });
};
