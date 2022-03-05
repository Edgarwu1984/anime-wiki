import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserService from "src/Services/userService";
import { SignUpForm } from "src/types/SignUpForm";
import { UserDoc } from "src/types/UserTypes";

type Form = {
  email: string;
  password: string;
};

type InitialState = {
  user: UserDoc;
  status: "loading" | "success" | "error" | "idle";
  message: string;
};

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ username, email, password }: SignUpForm, thunkAPI) => {
    try {
      await UserService.signupUser(username, email, password);
    } catch (error: any) {
      const message = error.message;
      error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: Form, thunkAPI) => {
    try {
      const user = UserService.loginUser(email, password);
      return user;
    } catch (error: any) {
      const message = error.message;
      error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  user: {},
  status: "idle",
  message: "",
} as InitialState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state: InitialState,
      action: PayloadAction<InitialState["user"]>
    ) => {
      state.user = action.payload;
    },
    logoutUser: (state: InitialState) => {
      localStorage.removeItem("userInfo");
      state.user = initialState.user;
      window.location.href = "/";
    },

    setMessage: (
      state: InitialState,
      action: PayloadAction<InitialState["message"]>
    ) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as any;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload as UserDoc;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as any;
      });
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
