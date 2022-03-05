import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "src/config/db";
import AnimeService from "src/Services/animeService";
import UserService from "src/Services/userService";

import { Anime } from "src/types/AnimeTypes";
import { UserDoc } from "src/types/UserTypes";

type InitialState = {
  animes: Anime[];
  anime: Anime;
  status: "loading" | "success" | "error" | "idle";
  message: string;
};

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
    {
      id,
      animeData,
      userData,
    }: { id: string; animeData: Anime; userData: UserDoc },
    thunkAPI
  ) => {
    try {
      await AnimeService.updateAnime(id, {
        ...animeData,
        likes: animeData.likes + 1,
      });

      const user = await UserService.getUser(userData.uid);

      await UserService.updateUser(user?.uid, {
        ...userData,
        animeCollections: [...user?.animeCollections, id],
      });
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
      error.toString();
      return thunkAPI.rejectWithValue(message);
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
} as InitialState;

export const animeSlice = createSlice({
  name: "animes",
  initialState,
  reducers: {
    reset: (state) => (state = initialState),
    setAnimes: (
      state: InitialState,
      action: PayloadAction<InitialState["animes"]>
    ) => {
      state.animes = action.payload;
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

export const { reset, setAnimes, setMessage } = animeSlice.actions;
export default animeSlice.reducer;
