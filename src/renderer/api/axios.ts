import axios from 'axios';

const instance = axios.create();
const prefix = `https://netease-cloud-music-api-3nxt35fss-sixgramwater.vercel.app`;

// instance.interceptors.request.use()

export default instance;

export const get = (url: string, query?: any) => {
  return instance({
    url: prefix + url,
    method: 'GET',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    params: query,
    withCredentials: true,
  });
};

export const post = (url: string, query: any) => {
  return instance({
    url: prefix + url,
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data: query,
    withCredentials: true,
  });
};
