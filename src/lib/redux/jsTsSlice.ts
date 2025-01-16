import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JsTsState {
  isTypeScript: boolean;
}

const initialState: JsTsState = {
  isTypeScript: true,
};

export const jsTsSlice = createSlice({
  name: "jsTs",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<boolean>) => {
      state.isTypeScript = action.payload;
    },
    toggleLanguage: (state) => {
      const previousValue = state.isTypeScript;
      state.isTypeScript = !previousValue;
      console.log('Language toggled:', { previous: previousValue, current: state.isTypeScript });
    },
  },
});

export const { setLanguage, toggleLanguage } = jsTsSlice.actions;

export default jsTsSlice.reducer;
