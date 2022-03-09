import { User } from "firebase/auth";
import { Anime } from "./AnimeTypes";

export interface UserDoc {
  uid: string | undefined;
  animeCollections: string[] | undefined;
  isAdmin: boolean | undefined;
}

export interface InitialUserStateTypes {
  user: User | null;
  userDoc: UserDoc | undefined;
  userAnimes: Anime[];
  status: "loading" | "success" | "error" | "idle";
  message: string;
}
