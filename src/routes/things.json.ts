import sanity from '$lib/services/sanity';

// Fetch all valid posts & authors to display in the homepage
export async function get() {
  const data = await sanity.getClient().fetch(`{
		"things": *[_type == "thing"]
  }`);

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
