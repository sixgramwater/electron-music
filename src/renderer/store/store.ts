import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import musicReducer from './musicSlice';
import playlistReducer from './playlistSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    music: musicReducer,
    playlist: playlistReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
