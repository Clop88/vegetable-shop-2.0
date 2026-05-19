import { configureStore } from '@reduxjs/toolkit';
import vegetablesReducer from './vegetablesSlice';

export const store = configureStore({
  reducer: {
    vegetables: vegetablesReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;