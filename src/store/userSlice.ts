import { log } from 'console';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types';

interface IState {
  userData: IUser | null;
  authData: {
    isAuth: boolean;
    token: string | null;
  };
  wordsCount: number;
}

const initialState: IState = {
  userData: null,
  authData: {
    isAuth: false,
    token: null,
  },
  wordsCount: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logIn(state, action: PayloadAction<IUser>) {
      const userData = action.payload;
      userData.photoURL =
        userData?.photoURL.slice(0, 10) + '4' + userData?.photoURL.slice(11);
      state.userData = userData;
      state.authData.isAuth = true;
    },
    logOut(state) {
      state.userData = null;
      state.authData.isAuth = false;
    },
    setWordsCount(state, action: PayloadAction<number>) {
      state.wordsCount = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { logIn, logOut, setWordsCount } = userSlice.actions;
