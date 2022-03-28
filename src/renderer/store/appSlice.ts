import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  showPlayList: boolean;
  showPlayingPage: boolean;
  user: UserType | undefined;
  token: string | undefined;
  downloadList: downloadItemType[];
  showToast: boolean;
  toastContent: string;
  showKlyric: boolean;
  likeList: number[];
}

export type UserType = {
  id: number;
  userName: string;
  nickname: string;
  vipType: number;
  signature: string;
  follows: number;
  followed: number;
  avatarUrl: string;
  city: number;
  province: number;
  salt: string;
  birthday: number;
};

type downloadStateType = "progressing" | "completed" | "cancelled" | "interrupted";

type ArtistType = {
  name: string;
  id: number;
};

type MusicItemType = {
  name: string;
  id: number;
  artists: ArtistType[];
  album: {
    name: string;
    id: number;
  };
  duration: number;
  alias: string[];
};
export interface downloadItemType {
  fileName: string;
  savePath: string;
  totalBytes: number;
  receivedBytes: number;
  paused: boolean;
  // percent: number;
  downloadPath: string;
  state: downloadStateType;
  startTime: number;
  url: string;
  musicItem?: MusicItemType;

}

const initialState: AppState = {
  showPlayList: false,
  showPlayingPage: false,
  token: undefined,
  user: undefined,
  downloadList: [],
  showToast: false,
  toastContent: '',
  showKlyric: false,
  likeList: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleShowPlayList: (state, action: PayloadAction<boolean>) => {
      state.showPlayList = action.payload;
    },
    toggleShowPlayingPage: (state, action: PayloadAction<boolean>) => {
      state.showPlayingPage = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    initDownloadList: (state, action) => {
      state.downloadList = action.payload;
    },
    beforeAddDownloadItem: (state, action) => {
      state.downloadList.push(action.payload);
    },
    addNewDownloadItem: (state, action) => {
      const index = state.downloadList.findIndex(item => item.url === action.payload.url);
      if(index !== -1) {
        let item = state.downloadList[index];
        state.downloadList[index] = {
          ...item,
          ...action.payload

        }
      }
      // state.downloadList.push(action.payload);
    },
    updateDownloadItem: (state, action) => {
      const index = state.downloadList.findIndex(item => item.startTime === action.payload.startTime);
      if(index !== -1) {
        let item = state.downloadList[index];
        state.downloadList[index] = {
          ...item,
          ...action.payload
        }

      }
    },
    toggleShowToast: (state, action) => {
      state.showToast = action.payload;
    },
    setToastContent: (state, action) => {
      state.toastContent = action.payload;
    },
    setShowKlyric: (state, action) => {
      state.showKlyric = action.payload;
    },
    setLikeList: (state, action) => {
      state.likeList = action.payload;
    }
  },
});

export const { toggleShowPlayList } = appSlice.actions;

export default appSlice.reducer;
