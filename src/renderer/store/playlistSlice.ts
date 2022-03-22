import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type artistType = {
  id: number;
  name: string;
};

export type albumType = {
  id: number;
  name: string;
  picUrl: string;
};

export type trackType = {
  name: string;
  id: number;
  artists: artistType[];
  album: albumType;
  duration: number;
}

export interface PlaylistState {
  currentMusicId: number | undefined;
  tracks: trackType[];
}

const initialState: PlaylistState = {
  currentMusicId: undefined,
  tracks: [],
}

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setCurrentMusicId: (state, action: PayloadAction<number>) => {
      state.currentMusicId = action.payload;
    },
    addTrackToPlaylist: (state, action: PayloadAction<trackType>) => {
      const newTrack = action.payload;
      if(state.tracks.findIndex(item => item.id === newTrack.id) === -1) {
        state.tracks.unshift(newTrack);
      }
    },
    setPlaylist: (state, action: PayloadAction<trackType[]>) => {
      state.tracks = action.payload;
    }
  }
});

export const { setCurrentMusicId, addTrackToPlaylist, setPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
