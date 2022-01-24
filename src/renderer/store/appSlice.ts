import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  showPlayList: boolean;
  showPlayingPage: boolean;
  user: UserType | undefined;
  token: string | undefined;
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

const initialState: AppState = {
  showPlayList: false,
  showPlayingPage: false,
  token: undefined,
  user: undefined,
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
  },
});

export const { toggleShowPlayList } = appSlice.actions;

export default appSlice.reducer;
