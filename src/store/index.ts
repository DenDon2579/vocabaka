import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import vocabularySlice from './vocabularySlice';
import visualSlice from './visualSlice';

const store = configureStore({
    reducer: { userSlice, vocabularySlice, visualSlice },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
