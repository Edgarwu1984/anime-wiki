import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "src/config/db";
import { SignUpForm } from "src/types/SignUpForm";

type Form = {
  email: string;
  password: string;
};

type User = {
  id: string | null;
  username: string | null;
  email: string | null;
  photo: string | null;
  lastSignInTime: string | undefined;
};

type InitialState = {
  user: User;
  status: "loading" | "success" | "error" | "idle";
  message: string;
};

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ username, email, password }: SignUpForm, thunkAPI) => {
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userData);
      await updateProfile(userData.user, {
        displayName: username,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/anime-wiki-93dac.appspot.com/o/user_images%2Fuser-icon-dark.png?alt=media&token=0c6096c4-6c6a-4d7d-ba1e-85640c8165bd",
      });

      //   return { email: auth.currentUser };
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
      const userData = await signInWithEmailAndPassword(auth, email, password);
      const user: User = {
        id: userData.user.providerId,
        username: userData.user.displayName,
        email: userData.user.email,
        photo: userData.user.photoURL,
        lastSignInTime: userData.user.metadata.lastSignInTime,
      };
      const token = await userData.user.getIdToken();

      const localStorageData = { user, token };

      localStorage.setItem("userInfo", JSON.stringify(localStorageData));
      console.log(userData);
      return user;
    } catch (error: any) {
      const message = error.message;
      error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  user: {
    id: null,
    username: null,
    email: null,
    photo: null,
    lastSignInTime: undefined,
  },
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
        state.user = action.payload as User;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as any;
      });
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
