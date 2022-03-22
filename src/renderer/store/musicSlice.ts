import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchDailyRecommendPlaylist, fetchDailyRecommendSongs } from 'renderer/api';
import Api from '../api';

type trackType = {
  name: string;
  id: number;
  artists: artistType[];
  album: albumType;
  duration: number;
  musicUrl?: string;
  lyricUrl?: string;
};

export interface MusicState {
  // showPlayList: boolean;
  isPlaying: boolean;
  curTime: number;
  duration: number;
  volume: number;
  seekTime: number;
  curMusic: musicType | undefined;
  curMusicId: number;
  audioRef: any;
  playingState: PlayingStateType;
  recommendPlaylist: PlaylistType[] | [];
  dailyRecommendSongs: musicType[] | [];
  playlists: PlaylistType[] | [];

  recommendPageLoading: boolean;
  playlistLoading: boolean;

  trackPlaylist: trackType[];
  playMode: number;

}

export type PlaylistType = {
  id: number;
  name: string;
  copywriter: string;
  picUrl: string;
  playCount: number;
  createTime: number;
  creator: {
    avatarUrl: string;
    nickname: string;
    signature: string;
  };
  trackCount: number;
  tracks: {
    name: string;
    id: number;
    artists: artistType[];
    album: albumType;
    duration: number;
  }[];
};

export type PlayingStateType = 'playing' | 'paused' | 'stop';

export type artistType = {
  id: number;
  name: string;
};

export type albumType = {
  id: number;
  name: string;
  picUrl: string;
};

export type musicType = {
  name: string;
  id: number;
  artists: artistType[];
  album: albumType;
  duration?: number;
  musicUrl?: string | undefined;
  lyricUrl?: string | undefined;
};

export const fetchDailyRecPlaylist = createAsyncThunk(
  'music/fetchDailyRecommendPlaylist',
  async () => {
    const response = await Api.fetchDailyRecommendPlaylist();
    return response.data;
  }
);

export const fetchDailyRecSongs = createAsyncThunk(
  'music/fetchDailtRecommendSongs',
  async () => {
    const response = await Api.fetchDailyRecommendSongs();
    return response.data;
  }
);

export const fetchMusicUrl = createAsyncThunk(
  'music/fetchMusicUrl',
  async (id: number) => {
    const response = await Api.fetchMusicUrl(id);
    return response.data;
  }
);

export const fetchLyricUrl = createAsyncThunk(
  'music/fetchLyricUrl',
  async (id: number) => {
    const response = await Api.fetchLyricUrl(id);
    return response.data;
  }
);

export const fetchPlaylistDetail = createAsyncThunk(
  'music/fetchPlaylistDetail',
  async (id: number) => {
    const response = await Api.fetchPlaylistDetail(id);
    return response.data;
  }
);

export const fetchPlaylistAllSongs = createAsyncThunk(
  'music/fetchPlaylistAllSongs',
  async (id: number) => {
    const response = await Api.fetchPlaylistAllSongs(id);
    return response.data;
  }
);

const initialState: MusicState = {
  isPlaying: false,
  curTime: 0,
  seekTime: 0,
  duration: 168,
  volume: 0.5,
  curMusicId: 1425763494,
  curMusic: {
    name: 'free with you',
    id: 1425763494,
    duration: 168000,
    artists: [
      {
        id: 31183880,
        name: 'Rnla',
      },
    ],
    album: {
      id: 85963100,
      name: 'free with you',
      picUrl:
        'http://p4.music.126.net/6kzetxKvZxzTXaL3aCl8RA==/109951164738162061.jpg',
    },
    musicUrl: undefined,
    lyricUrl: undefined,
  },
  audioRef: null,
  playingState: 'stop',

  recommendPlaylist: [],
  dailyRecommendSongs: [],
  playlists: [],

  playlistLoading: false,
  recommendPageLoading: false,
  trackPlaylist: [],
  playMode: 0,
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setAudioRef: (state, action) => {
      state.audioRef = action.payload;
    },
    setCurTime: (state, action) => {
      state.curTime = action.payload;
    },
    setCurMusic: (state, action: PayloadAction<musicType>) => {
      state.curMusic = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setPlayingState: (state, action: PayloadAction<PlayingStateType>) => {
      state.playingState = action.payload;
    },
    setPlaylistLoading: (state, action) => {
      state.playlistLoading = action.payload;
    },
    setRecommendPlaylist: (state, action) => {
      state.recommendPlaylist = action.payload;
    },
    setRecommendPageLoading: (state, action) => {
      state.recommendPageLoading = action.payload;
    },
    addPlaylists: (state, action) => {
      const { id, playlist } = action.payload;
      const index = state.playlists.findIndex((list) => list.id === id);
      if (index !== -1) {
        state.playlists[index] = playlist;
      } else {
        state.playlists.push(playlist as never);
      }
    },
    setTrackPlaylist: (state, action) => {
      state.trackPlaylist = action.payload;
    },
    addTrackPlaylist: (state, action: PayloadAction<trackType>) => {
      const newTrack = action.payload;
      if(state.trackPlaylist.findIndex(item => item.id === newTrack.id) === -1) {
        state.trackPlaylist.unshift(newTrack);
      }
    },
    setMusicId: (state, action) => {
      state.curMusicId = action.payload;
    },
    setSeekTime: (state, action) => {
      state.seekTime = action.payload;
    },
    setPlayMode: (state, action) => {
      state.playMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylistDetail.fulfilled, (state, action) => {});
  },
});

export const { setIsPlaying } = musicSlice.actions;

export default musicSlice.reducer;
