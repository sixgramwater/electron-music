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

export const fetchUserRecPlaylist = () =>
  get('/top/playlist', { limit: 10 }).then(value=>value.data);


export const fetchHqPlaylist = () =>
  get('/top/playlist/highquality', { limit: 10 }).then(value=>value.data);

// music url
export const fetchMusicUrl = (id: number) =>
  get('/song/url', { id, realIP: '36.149.165.179' });
// lyric url
export const fetchLyricUrl = (id: number) =>
  get('/lyric', { id, realIP: '36.149.165.179' });

export const fetchOfficialPlaylist = () => get('/user/playlist?uid=1463586082');
// recent
export const fetchRecentPlayedSongs = () =>
  get('/record/recent/song', { limit: 30 });

// search
export const fetchHotSearch = () => get('/search/hot/detail');

export const fetchSearchSuggest = (keywords: string) =>
  get('/search/suggest', { keywords });


// music detail
export const fetchMusicDetail = (ids: string | number) => get('/song/detail', { ids }).then(value=>value.data);

// singer

export const fetchSingerDetail = (id: number) => get('/artist/detail', { id }).then((value) => value.data);

export const fetchSingerAlbum = (id: number, limit?: number, offset?: number) => get('/artist/album', { id, limit, offset }).then(value => value.data)

export const fetchSingerTopSongs = (id: number) => get('/artist/top/song', { id }).then(value => value.data);
// export const fetchSingerDesc = (id: number)
export const fetchSingerAllSongs = (id: number, limit?: number, offset?: number) => get('/artist/songs', { id, limit, offset }).then(value => value.data)

export const search = (
  keywords: string,
  limit: number = 30,
  offset: number = 0,
  type: number = 1
) => get('/cloudsearch', { keywords, limit, offset, type });

// like
export const likeSongs = (like: boolean = true) => get('/like', { like }).then(value => value.data);

export const fetchLikelist = (uid: number) => get('/likelist', { uid }).then(value=>value.data);


// banner
export const fetchBanner = () => get('/banner').then(value => value.data);

// toplist
export const fetchToplistDetail = () => get('/toplist/detail').then(value=>value.data);

// export const fetch


// album
export const fetchAlbumDetail = (id: number) => get('/album', { id }).then(value => value.data);

// homepage
export const fetchHomepageResource = () => get('/homepage/block/page').then(value => value.data);

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
