import Cookie from "js-cookie";


const LOGIN_COOKIE = import.meta.env.VITE_LOGIN_COOKIE;

const BASE_URL = import.meta.env.VITE_DEV_MODE == 'dev' 
  ? import.meta.env.VITE_API_LOCALHOST 
  : import.meta.env.VITE_API_URL;

const headers = {
  "Content-Type": "application/json",
  "api-key": import.meta.env.VITE_API_KEY,
};



export const myFetch = async (method, endpoint, options = {}) => {
  options?.body && (options.body = JSON.stringify(options.body));
  headers['x-auth-token'] = Cookie.get(LOGIN_COOKIE) ?? "";

  const resp = await fetch(BASE_URL + endpoint, {
    method,
    headers,
    ...options,
  }).catch(err => console.error(`Server is down: ${err}`));



  const result = (resp.status === 204) ? "deleted!" : await resp?.json();

  if(resp?.ok) return [result, null];
  else         return [null, result];
}
