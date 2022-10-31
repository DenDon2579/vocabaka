import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITestWordData, IUser, IWordData } from '../types';

interface IState {
    words: ITestWordData[];
    wordsCount: number;
}

const initialState: IState = {
    wordsCount: 0,
    words: [],   
};

const testSlice = createSlice({
    name: 'test',
    initialState: initialState,
    reducers: {
        setTestWords(state, action: PayloadAction<ITestWordData[]>) {
            state.words = action.payload;
        },
        setWordsCount(state, action: PayloadAction<number>) {
            state.wordsCount = action.payload;
        },
        setAnswer(state, action: PayloadAction<[number, string]>) {
            const [id, answer] = action.payload;
            const index = state.words.findIndex((word) => word.id === id);
            state.words[index].answer = answer;
        },
        purgeTestData(state) {
            state.words = [];
            state.wordsCount = 0;
        },
        setResults(state, action: PayloadAction<ITestWordData[]>) {
            state.words = action.payload;
        },
    },
});

export default testSlice.reducer;

export const {
    setTestWords,
    setWordsCount,
    setAnswer,
    purgeTestData,
    setResults,
} = testSlice.actions;
