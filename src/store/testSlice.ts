import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IWordData } from '../types';

interface IState {
    words: IWordData[];
    wordsCount: number;
    answers: {
        [key: number]: string;
    };
}

const initialState: IState = {
    wordsCount: 0,
    words: [],
    answers: {},
};

const testSlice = createSlice({
    name: 'test',
    initialState: initialState,
    reducers: {
        setTestWords(state, action: PayloadAction<IWordData[]>) {
            state.words = action.payload;
        },
        setWordsCount(state, action: PayloadAction<number>) {
            state.wordsCount = action.payload;
        },
        setAnswer(state, action: PayloadAction<[number, string]>) {
            const [id, answer] = action.payload;
            state.answers[id] = answer;
        },
        purgeTestData(state) {
            state.answers = {};
            state.words = [];
            state.wordsCount = 0;
        },
    },
});

export default testSlice.reducer;

export const { setTestWords, setWordsCount, setAnswer, purgeTestData } =
    testSlice.actions;
