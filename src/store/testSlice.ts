import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITestWordData, IUser, IWordData } from '../types';

interface IState {
  words: ITestWordData[];
}

const initialState: IState = {
  words: [],
};

const testSlice = createSlice({
  name: 'test',
  initialState: initialState,
  reducers: {
    setTestWords(state, action: PayloadAction<ITestWordData[]>) {
      state.words = action.payload;
    },

    setAnswer(state, action: PayloadAction<[number, string]>) {
      const [id, answer] = action.payload;
      const index = state.words.findIndex((word) => word.id === id);
      state.words[index].answer = answer;
    },
    purgeTestData(state) {
      state.words = [];
    },
    setResults(state, action: PayloadAction<ITestWordData[]>) {
      state.words = action.payload;
    },
  },
});

export default testSlice.reducer;

export const {
  setTestWords,

  setAnswer,
  purgeTestData,
  setResults,
} = testSlice.actions;
