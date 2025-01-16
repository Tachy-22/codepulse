import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData extends User {
  [key: string]: unknown;
}

interface UserState {
  user: UserData | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserData|null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
