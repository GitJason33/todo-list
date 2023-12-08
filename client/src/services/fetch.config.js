import Cookie from "js-cookie";
import config from "@/../config.js";
import process from "process";


const LOGIN_COOKIE = config["login-cookie"];
const BASE_URL = process.env.API_DOMAIN;

const headers = {
  "Content-Type": "application/json",
  "api-key": process.env.API_KEY,
  "x-auth-token": Cookie.get(LOGIN_COOKIE) ?? "",
};


export const myFetch = async (method, endpoint, options = {}) => {
  options?.body && (options.body = JSON.stringify(options.body))

  const resp = await fetch(BASE_URL + endpoint, {
    method,
    headers,
    ...options,
  }).catch(err => console.error(`Server is down: ${err}`));



  const result = (resp.status === 204) ? "deleted!" : await resp?.json();

  if(resp?.ok) return [result, null];
  else         return [null, result];
}
