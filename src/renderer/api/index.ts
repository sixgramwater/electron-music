// import axios from './axios';
import { get, post } from './axios';

// const prefix = `https://netease-cloud-music-api-3nxt35fss-sixgramwater.vercel.app`;

type loginParaType = {
  email: string;
  password: string;
};

// login
export const loginByEmail = (para: loginParaType) => get('/login', para);

// playlist
export const fetchUserPlaylist = (uid: number) =>
  get('/user/playlist', { uid });

export const fetchDailyRecommendPlaylist = () => get('/recommend/resource');

export const fetchDailyRecommendSongs = () => get('/recommend/songs');

export const fetchUserLikelist = (uid: number) => get('/likelist', { uid });

export const fetchPlaylistDetail = (id: number) =>
  get('/playlist/detail', { id });

export const fetchPlaylistAllSongs = (id: number) =>
  get('/playlist/track/all', { id });

// music url
export const fetchMusicUrl = (id: number) =>
  get('/song/url', { id, reallIP: '36.149.165.179' });
// lyric url
export const fetchLyricUrl = (id: number) =>
  get('/lyric', { id, reallIP: '36.149.165.179' });

export const fetchOfficialPlaylist = () => get('/user/playlist?uid=1463586082');
// recent
export const fetchRecentPlayedSongs = () =>
  get('/record/recent/song', { limit: 30 });

// search
export const fetchHotSearch = () => get('/search/hot/detail');

export const fetchSearchSuggest = (keywords: string) =>
  get('/search/suggest', { keywords });

export const search = (
  keywords: string,
  limit: number = 30,
  offset: number = 0,
  type: number = 1
) => get('/cloudsearch', { keywords, limit, offset, type });

// export const

const Api = {
  loginByEmail,
  fetchDailyRecommendPlaylist,
  fetchDailyRecommendSongs,
  fetchMusicUrl,
  fetchLyricUrl,
  fetchPlaylistDetail,
  fetchPlaylistAllSongs,
  fetchUserPlaylist,
};

export default Api;
