import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserService from "src/Services/userService";
import { SignUpForm } from "src/types/SignUpForm";
import { InitialUserStateTypes, UserDoc } from "src/types/UserTypes";
import { User } from "firebase/auth";

type Form = {
  email: string;
  password: string;
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    { username, email, password }: SignUpForm,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const user = await UserService.signupUser(username, email, password);
      const userDoc = await UserService.getUserById(user.uid);
      dispatch(setUserDoc(userDoc));
      return user;
    } catch (error: any) {
      const message = error.message;
      error.toString();
      return rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: Form, { dispatch, rejectWithValue }) => {
    try {
      const user = await UserService.loginUser(email, password);
      const userDoc = await UserService.getUserById(user.uid);
      dispatch(setUserDoc(userDoc));
      return user;
    } catch (error: any) {
      const message = error.message;
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await UserService.logoutUser();
      dispatch(setUserDoc(initialState.userDoc));
    } catch (error: any) {
      const message = error.message;
      return rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (uid: string, { dispatch, rejectWithValue }) => {
    try {
      const userDoc = await UserService.getUserById(uid);
      dispatch(setUserDoc(userDoc));
      return userDoc;
    } catch (error: any) {
      const message = error.message;
      return rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (
    { uid, data }: { uid: string; data: UserDoc },
    { rejectWithValue }
  ) => {
    try {
      return await UserService.updateUserById(uid, data);
    } catch (error: any) {
      const message = error.message;
      return rejectWithValue(message);
    }
  }
);

export const getUserAnimeCollection = createAsyncThunk(
  "user/userAnimes",
  async (uid: string, thunkAPI) => {
    try {
      const animes = await UserService.getUserAnimes(uid);
      return animes;
    } catch (error: any) {
      const message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  user: null,
  userDoc: {},
  status: "idle",
  message: "",
} as InitialUserStateTypes;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state: InitialUserStateTypes,
      action: PayloadAction<InitialUserStateTypes["user"]>
    ) => {
      state.user = action.payload;
    },
    setUserDoc: (
      state: InitialUserStateTypes,
      action: PayloadAction<InitialUserStateTypes["userDoc"]>
    ) => {
      state.userDoc = action.payload;
    },
    setMessage: (
      state: InitialUserStateTypes,
      action: PayloadAction<InitialUserStateTypes["message"]>
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
        state.user = action.payload as User;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload as User;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "success";
        state.user = initialState.user;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      })
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userDoc = action.payload as UserDoc;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "success";
        // state.user = action.payload as User;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      });
  },
});

export const { setUser, setUserDoc } = userSlice.actions;
export default userSlice.reducer;
