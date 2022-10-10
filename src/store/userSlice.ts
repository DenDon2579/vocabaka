import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types';

interface IState {
    userData: IUser | null;
    authData: {
        isAuth: boolean;
    };
}

const initialState: IState = {
    userData: null,
    authData: {
        isAuth: false,
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logIn(state, action: PayloadAction<IUser>) {
            const userData = action.payload;
            userData.photoURL =
                userData?.photoURL.slice(0, 10) +
                '4' +
                userData?.photoURL.slice(11);
            state.userData = userData;
            state.authData.isAuth = true;
        },
        logOut(state) {
            state.userData = null;
            state.authData.isAuth = false;
        },
    },
});

export default userSlice.reducer;

export const { logIn, logOut } = userSlice.actions;
