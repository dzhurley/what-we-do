import { writable } from 'svelte/store';
import createAuth0Client from '@auth0/auth0-spa-js';
import type { Auth0Client, User } from '@auth0/auth0-spa-js';

export const clientInitialized = writable(false);
export const isAuthenticated = writable(false);
export const user = writable<User>({});
export const popupOpen = writable(false);

let client: Auth0Client;

const createClient = async () => {
  client = await createAuth0Client({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
  });
  clientInitialized.set(true);
  isAuthenticated.set(await client.isAuthenticated());
  user.set(await client.getUser());
};

const loginWithPopup = async () => {
  popupOpen.set(true);
  try {
    await client.loginWithPopup();
    user.set(await client.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
};

const logout = () => client.logout();

const auth0 = {
  createClient,
  loginWithPopup,
  logout,
};

export default auth0;
