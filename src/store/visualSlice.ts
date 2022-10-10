import { createSlice } from '@reduxjs/toolkit';

interface IState {
    isPopupVisible: boolean;
}

const initialState: IState = {
    isPopupVisible: false,
};

const visualSlice = createSlice({
    name: 'visual',
    initialState: initialState,
    reducers: {
        showPopup(state) {
            state.isPopupVisible = true;
        },
        hidePopup(state) {
            state.isPopupVisible = false;
        },
    },
});

export default visualSlice.reducer;

export const { showPopup, hidePopup } = visualSlice.actions;
