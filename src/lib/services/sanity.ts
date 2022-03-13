import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  token: import.meta.env.VITE_SANITY_TOKEN,
  useCdn: true,
});

const getClient = () => client;

const sanity = {
  getClient,
};

export default sanity;
