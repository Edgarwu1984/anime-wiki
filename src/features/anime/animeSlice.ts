import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
  PayloadAction,
} from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "src/config/db";
import AnimeService from "src/Services/animeService";
import UserService from "src/Services/userService";

import { Anime, InitialAnimeState } from "src/types/AnimeTypes";
import { InitialUserStateTypes, UserDoc } from "src/types/UserTypes";
import { getUser, getUserAnimeCollection, setUser } from "../user/userSlice";

export const getAnimes = createAsyncThunk(
  "animes/getAnimes",
  async (_, thunkAPI) => {
    try {
      return await AnimeService.getAnimes();
    } catch (error: any) {
      const message = error.message;
      error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTopAnimes = createAsyncThunk(
  "animes/getTopAnimes",
  async (_, thunkAPI) => {
    try {
      return await AnimeService.getTopAnimes();
    } catch (error: any) {
      const message = error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAnime = createAsyncThunk(
  "animes/getAnime",
  async (id: string, thunkAPI) => {
    try {
      return await AnimeService.getAnime(id);
    } catch (error: any) {
      const message = error.message;
      error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const likeAnime = createAsyncThunk(
  "animes/likeAnime",
  async (
    { anime, user }: { anime: Anime; user: User | null },
    { dispatch }
  ) => {
    try {
      if (user) {
        const userDoc = (await UserService.getUserById(user.uid)) as UserDoc;
        const hasLiked = userDoc?.animeCollections?.some(
          (item) => item === anime.id
        );

        // Unlike
        if (hasLiked) {
          // Like count -1
          await AnimeService.updateAnime(anime.id, {
            ...anime,
            likes: anime.likes - 1,
          });

          // Update collection array
          const newUserAnimes = userDoc?.animeCollections?.filter(
            (item) => item !== anime.id
          );
          await UserService.updateUserById(user.uid, {
            ...userDoc,
            animeCollections: newUserAnimes,
          });
        } else {
          await AnimeService.updateAnime(anime.id, {
            ...anime,
            likes: anime.likes + 1,
          });

          // Update collection array
          const newUserAnimes = userDoc?.animeCollections;
          if (newUserAnimes) {
            await UserService.updateUserById(user.uid, {
              ...userDoc,
              animeCollections: [...newUserAnimes, anime.id],
            });
          }
        }
      }
      dispatch(getAnime(anime.id));
      dispatch(getUserAnimeCollection(user?.uid));
    } catch (error: any) {
      const message = error.message;

      return isRejectedWithValue(message);
    }
  }
);

const initialState = {
  animes: [],
  anime: {
    id: "",
    slug: "",
    title: "",
    category: "uncategoried",
    genre: "unknown",
    region: "unknown",
    directedBy: "",
    releaseYear: "",
    description: "",
    coverImage: "",
    bannerImage: "",
    featureImage: "",
    galleries: [],
    likes: 0,
  },
  status: "idle",
  message: "",
} as InitialAnimeState;

export const animeSlice = createSlice({
  name: "animes",
  initialState,
  reducers: {
    reset: (state) => (state = initialState),
    setAnime: (
      state: InitialAnimeState,
      action: PayloadAction<InitialAnimeState["anime"]>
    ) => {
      state.anime = action.payload;
    },
    setAnimes: (
      state: InitialAnimeState,
      action: PayloadAction<InitialAnimeState["animes"]>
    ) => {
      state.animes = action.payload;
    },
    setMessage: (
      state: InitialAnimeState,
      action: PayloadAction<InitialAnimeState["message"]>
    ) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnimes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAnimes.fulfilled, (state, action) => {
        state.status = "idle";
        state.animes = action.payload;
      })
      .addCase(getAnimes.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      })
      .addCase(getTopAnimes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTopAnimes.fulfilled, (state, action) => {
        state.status = "success";
        state.animes = action.payload;
      })
      .addCase(getTopAnimes.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      })
      .addCase(getAnime.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAnime.fulfilled, (state, action) => {
        state.status = "success";
        state.anime = action.payload;
      })
      .addCase(getAnime.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      })
      .addCase(likeAnime.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likeAnime.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(likeAnime.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
      });
  },
});

export const { reset, setAnime, setAnimes, setMessage } = animeSlice.actions;
export default animeSlice.reducer;
