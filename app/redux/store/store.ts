import {configureStore} from '@reduxjs/toolkit';
import racersReducer from './state/racers';
import racesDataReducer from './state/races';

export const store = configureStore({
  reducer: {
    racers: racersReducer,
    racesData: racesDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
