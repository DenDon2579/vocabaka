import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWordData } from '../types';

interface IState {
    words: IWordData[] | null;
}

const initialState: IState = {
    words: null,
};

const vocabularySlice = createSlice({
    name: 'vocabulary',
    initialState: initialState,
    reducers: {
        setWords(state, action: PayloadAction<IWordData[]>) {
            state.words = action.payload;
        },
    },
});

export default vocabularySlice.reducer;

export const { setWords } = vocabularySlice.actions;
