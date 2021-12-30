// import axios from './axios';
import { get, post } from './axios';

// const prefix = `https://netease-cloud-music-api-3nxt35fss-sixgramwater.vercel.app`;

type loginParaType = {
  email: string;
  password: string;
}
export const loginByEmail = (para: loginParaType) => get('/login', para);

export const fetchUserPlaylist = (uid: number) => get('/user/playlist', {uid});

export const fetchDailyRecommendPlaylist = () => get('/recommend/resource');

export const fetchDailyRecommendSongs = () => get('/recommend/songs');

export const fetchUserLikelist = (uid: number) => get('/likelist', {uid});

export const fetchPlaylistDetail = (id: number) => get('/playlist/detail', {id});

export const fetchPlaylistAllSongs = (id: number) => get('/playlist/track/all', {id});

export const fetchMusicUrl = (id: number) => get('/song/url', {id});

export const fetchLyricUrl = (id: number) => get('/lyric', {id});

export const fetchOfficialPlaylist = () => get('/user/playlist?uid=1463586082');

const Api = {
  loginByEmail,
  fetchDailyRecommendPlaylist,
  fetchDailyRecommendSongs,
  fetchMusicUrl,
  fetchLyricUrl,
  fetchPlaylistDetail,
  fetchPlaylistAllSongs,
  fetchUserPlaylist,
}

export default Api;
