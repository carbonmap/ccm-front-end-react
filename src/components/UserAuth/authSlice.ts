import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  token: string | null | "";
  user: object | null;
};

const initialState: State = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(
      state: State,
      action: PayloadAction<{ token: string; user: object }>
    ) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state: State) {
      state.user = null;
      state.token = null;
    },
  },
});

export default authSlice;
