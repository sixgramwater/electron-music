import { createSlice } from '@reduxjs/toolkit';

type DownloadItemType = {
  paused: boolean,
  recievedBytes: number,
  savePath: string,
  startTime: number,
  state: 'progressing' | 'completed',
  totalBytes: number,
  url: string,
  id: number,
}

export type DownloadState = {
  list: DownloadItemType[];
}

const initialState: DownloadState = {
  list: [],
}

const downloadSlice = createSlice({
  name: 'download',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const index = state.list.findIndex(item => item.id === action.payload.id);
      if(index === -1) {
        state.list.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.list.filter(item => item.id !== action.payload);
    },
    updateItem: (state, action) => {
      const {id, item} = action.payload;
      const index = state.list.findIndex(item => item.id === id);
      if(index !== -1) {
        state.list[index] = {
          ...state.list[index],
          ...item,
        }
      }
    }
  }
});

export default downloadSlice.reducer;
