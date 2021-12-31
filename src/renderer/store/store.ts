import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import musicReducer from './musicSlice';
import downloadReducer from './downloadSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    music: musicReducer,
    download: downloadReducer,
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
