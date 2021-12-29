import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import musicReducer from './musicSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    music: musicReducer,
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
