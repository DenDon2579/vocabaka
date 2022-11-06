import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWordData } from '../types';

interface IState {
  words: IWordData[] | null;
  visual: {
    dragAndDrop: {
      isDropZonesShow: boolean;
      starIcon: '☆' | '★';
    };
  };
}

const initialState: IState = {
  words: null,
  visual: {
    dragAndDrop: {
      isDropZonesShow: false,
      starIcon: '★',
    },
  },
};

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState: initialState,
  reducers: {
    setWords(state, action: PayloadAction<IWordData[]>) {
      state.words = action.payload;
    },
    showDropZones(state) {
      state.visual.dragAndDrop.isDropZonesShow = true;
    },
    hideDropZones(state) {
      state.visual.dragAndDrop.isDropZonesShow = false;
    },
    setStarIcon(state, action: PayloadAction<'☆' | '★'>) {
      state.visual.dragAndDrop.starIcon = action.payload;
    },
  },
});

export default vocabularySlice.reducer;

export const { setWords, showDropZones, hideDropZones, setStarIcon } =
  vocabularySlice.actions;
