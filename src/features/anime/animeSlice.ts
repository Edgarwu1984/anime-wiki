import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "src/config/db";
import { Anime, InitialAnimeState } from "src/types/AnimeTypes";
import { UserDoc } from "src/types/UserTypes";
import { getUserAnimeCollection, getUserDoc } from "../user/userSlice";

export const getAnimes = createAsyncThunk(
  "animes/getAnimes",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const ref = collection(db, "anime_list");

      const snapshot = await getDocs(ref);

      const data = snapshot.docs.map((doc) => {
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

export const getTopAnimes = createAsyncThunk(
  "animes/getTopAnimes",
  async (_, { rejectWithValue }) => {
    try {
      const ref = query(
        collection(db, "anime_list"),
        orderBy("likes", "desc"),
        limit(4)
      );
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map((doc) => {
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

export const postAnime = createAsyncThunk(
  "animes/postAnime",
  async (
    { data, docId }: { data: Anime; docId: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      if (!data || !docId) {
        dispatch(setMessageType("error"));
        dispatch(setMessage("Invalid Data or Document ID"));
      } else {
        await setDoc(doc(db, "anime_list", docId), data);
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAnimeById = createAsyncThunk(
  "animes/getAnimeById",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const animeRef = doc(db, "anime_list", id);

      const animeSnapshot = await getDoc(animeRef);
      if (!animeSnapshot.exists()) {
        dispatch(setMessage("Anime does not exist."));
        dispatch(setMessageType("error"));
      } else {
        const anime = animeSnapshot.data();
        return anime as Anime;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const likeAnime = createAsyncThunk(
  "animes/likeAnime",
  async (
    { anime, user }: { anime: Anime; user: User | null },
    { rejectWithValue, dispatch }
  ) => {
    try {
      if (user) {
        const animeRef = doc(db, "anime_list", anime.id);
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);
        const userDoc = userSnapshot.data() as UserDoc;

        const hasLiked = userDoc.animeCollections.some(
          (item) => item === anime.id
        );

        // Unlike
        if (hasLiked) {
          // Like count -1
          await updateDoc(animeRef, {
            ...anime,
            likes: anime.likes - 1,
          });
          // Update collection array
          const newUserAnimes = userDoc.animeCollections.filter(
            (item) => item !== anime.id
          );

          await updateDoc(userRef, { animeCollections: newUserAnimes });
        } else {
          await updateDoc(animeRef, {
            ...anime,
            likes: anime.likes + 1,
          });

          // Update collection array
          const newUserAnimes = [...userDoc.animeCollections, anime.id];

          if (newUserAnimes) {
            await updateDoc(userRef, {
              ...userDoc,
              animeCollections: newUserAnimes,
            });
          }
        }
        dispatch(getAnimeById(anime.id));
        dispatch(getUserDoc(user.uid));
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
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
    contributedBy: "",
  },
  status: "idle",
  isLoaded: false,
  message: "",
  messageType: "info",
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
    setMessageType: (
      state: InitialAnimeState,
      action: PayloadAction<InitialAnimeState["messageType"]>
    ) => {
      state.messageType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnimes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAnimes.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoaded = true;
        state.animes = action.payload;
      })
      .addCase(getAnimes.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
        state.messageType = "error";
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
        state.messageType = "error";
      })
      .addCase(getAnimeById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAnimeById.fulfilled, (state, action) => {
        state.status = "success";
        state.anime = action.payload as Anime;
      })
      .addCase(getAnimeById.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
        state.messageType = "error";
      })
      .addCase(likeAnime.pending, (state) => {
        state.status = "loading_like";
      })
      .addCase(likeAnime.fulfilled, (state, action) => {
        state.status = "like_success";
      })
      .addCase(likeAnime.rejected, (state, action) => {
        state.status = "error";
        state.message = action.payload as string;
        state.messageType = "error";
      });
  },
});

export const { reset, setAnime, setAnimes, setMessage, setMessageType } =
  animeSlice.actions;
export default animeSlice.reducer;
