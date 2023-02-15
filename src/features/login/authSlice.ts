import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginApi } from "../../app/services/login";
import type { RootState } from "../../app/store";

export interface LoginRequest {
  email: string;
}

export interface IUser {
  id: number;
  token: string;
  email: string;
  url: string | null;
  starts: number;
  submissions: number;
  firstStart: string;
  firstSubmission: string;
  lastSubmission: string;
}

interface IUserState {
  user: null | IUser;
  isAuthenticated: boolean;
}

const initialState: IUserState = {
  user: null,
  isAuthenticated: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      //   state.token = token;
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      //   .addMatcher(postsApi.endpoints.login.matchPending, (state, action) => {
      //     console.log('pending', action)
      //   })
      //   .addMatcher(postsApi.endpoints.login.matchFulfilled, (state, action) => {
      //     console.log('fulfilled', action)
      //     state.user = action.payload.user
      //     state.token = action.payload.token
      //   })
      .addMatcher(loginApi.endpoints.login.matchRejected, (state, action) => {
        console.log("rejected", action);
      });
  },
});

export const { logout, setCredentials } = slice.actions;
export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
