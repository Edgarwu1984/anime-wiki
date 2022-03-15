import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignUpForm } from "src/types/SignUpForm";
import { InitialUserStateTypes, UserDoc } from "src/types/UserTypes";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { Anime } from "src/types/AnimeTypes";
import { auth, db } from "src/config/db";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

type UserProfile = {
  photo: string | null | undefined;
  username: string | null | undefined;
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    { username, email, password }: SignUpForm,
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Set default user photo
      await updateProfile(user, {
        displayName: username,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/anime-wiki-93dac.appspot.com/o/user_images%2Fuser-icon-dark.png?alt=media&token=0c6096c4-6c6a-4d7d-ba1e-85640c8165bd",
      });

      // Create user document
      const userDoc: UserDoc = {
        uid: user.uid,
        username: username,
        animeCollections: [],
        isAdmin: false,
      };

      await setDoc(doc(db, "users", user.uid), userDoc);

      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const user = (await signInWithEmailAndPassword(auth, email, password))
        .user;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          dispatch(setMessage("Anime does not exist."));
          dispatch(setMessageType("error"));
        } else {
          const userDoc = userSnapshot.data() as UserDoc;
          dispatch(setUserDoc(userDoc));
        }
      }
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await signOut(auth);
      dispatch(setUserDoc(initialState.userDoc));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserDoc = createAsyncThunk(
  "user/getUserDoc",
  async (uid: string, { dispatch, rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userDoc = userSnapshot.data() as UserDoc;

        dispatch(setUserDoc(userDoc));

        return userDoc;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (
    { user, formData }: { user: User | null; formData: UserProfile },
    { rejectWithValue }
  ) => {
    try {
      const { username, photo } = formData;
      if (user !== null) {
        await updateProfile(user, {
          displayName: username,
          photoURL: photo,
        });
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserDoc = createAsyncThunk(
  "user/updateUserDoc",
  async (
    { uid, data }: { uid: string; data: UserDoc },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { ...data });
      dispatch(getUserDoc(uid));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserAnimeCollection = createAsyncThunk(
  "user/userAnimes",
  async (uid: any, { rejectWithValue, dispatch }) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userDoc = userSnapshot.data() as UserDoc;

        const animeRef = query(
          collection(db, "anime_list"),
          where("id", "in", userDoc.animeCollections)
        );

        const querySnapshot = await getDocs(animeRef);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs.map((doc) => {
            const id = doc.id;
            const data = doc.data();
            return { id, ...data };
          }) as Anime[];

          return data;
        }
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserContributions = createAsyncThunk(
  "user/userContribution",
  async (uid: any, { rejectWithValue }) => {
    try {
      const animeRef = query(
        collection(db, "anime_list"),
        where("contributedBy", "==", uid)
      );

      const querySnapshot = await getDocs(animeRef);

      const data = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
      });

      return data as Anime[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  userDoc: {
    username: "",
    animeCollections: [],
    uid: "",
    isAdmin: false,
  },
  userAnimes: [],
  userContribution: [],
  status: "idle",
  isLoaded: false,
  message: "",
  messageType: "info",
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
    setUserAnimes: (
      state: InitialUserStateTypes,
      action: PayloadAction<InitialUserStateTypes["userAnimes"]>
    ) => {
      state.userAnimes = action.payload;
    },
    setMessage: (
      state: InitialUserStateTypes,
      action: PayloadAction<InitialUserStateTypes["message"]>
    ) => {
      state.message = action.payload;
    },
    setMessageType: (
      state: InitialUserStateTypes,
      action: PayloadAction<InitialUserStateTypes["messageType"]>
    ) => {
      state.messageType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "registering_user";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "register_success";
        state.user = action.payload as User;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "register_error";
        state.message = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "login_user";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "login_success";
        state.user = action.payload as User;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "login_error";
        state.message = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "logout_user";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "logout_success";
        state.user = initialState.user;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "logout_error";
        state.message = action.payload as string;
      })
      .addCase(getUserDoc.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserDoc.fulfilled, (state, action) => {
        state.status = "success";
        state.userDoc = action.payload as UserDoc;
      })
      .addCase(getUserDoc.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      })
      .addCase(updateUserDoc.pending, (state) => {
        state.status = "updating_user";
      })
      .addCase(updateUserDoc.fulfilled, (state, action) => {
        state.status = "update_success";
        // state.user = action.payload as User;
      })
      .addCase(updateUserDoc.rejected, (state, action) => {
        state.status = "update_error";
        state.message = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "updating_user";
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.status = "update_success";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "update_error";
        state.message = action.payload as string;
      })
      .addCase(getUserAnimeCollection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserAnimeCollection.fulfilled, (state, action) => {
        state.status = "success";
        state.userAnimes = action.payload as Anime[];
      })
      .addCase(getUserAnimeCollection.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      })

      .addCase(getUserContributions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserContributions.fulfilled, (state, action) => {
        state.status = "success";
        state.userContribution = action.payload as Anime[];
      })
      .addCase(getUserContributions.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      });
  },
});

export const {
  setUser,
  setUserDoc,
  setUserAnimes,
  setMessage,
  setMessageType,
} = userSlice.actions;
export default userSlice.reducer;
