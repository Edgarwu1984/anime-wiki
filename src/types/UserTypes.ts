import { User } from "firebase/auth";
import { Anime } from "./AnimeTypes";

export interface UserDoc {
  uid: string;
  username: string;
  animeCollections: string[];
  isAdmin: boolean;
}

export interface InitialUserStateTypes {
  user: User | null;
  userDoc: UserDoc;
  userAnimes: Anime[];
  userContribution: Anime[];
  status:
    | "updating_user"
    | "update_success"
    | "update_error"
    | "registering_user"
    | "register_success"
    | "register_error"
    | "login_user"
    | "login_success"
    | "login_error"
    | "logout_user"
    | "logout_success"
    | "logout_error"
    | "loading"
    | "success"
    | "error"
    | "idle";
  isLoaded: boolean;
  message: string;
  messageType: "info" | "success" | "error" | "warning";
}
