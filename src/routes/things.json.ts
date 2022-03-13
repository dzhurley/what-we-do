import { getThings } from '$lib/sanity';

export async function get() {
  const data = await getThings();

  if (data) {
    return {
      status: 200,
      body: data,
    };
  }

  return {
    status: 500,
    body: new Error('Internal Server Error'),
  };
}
