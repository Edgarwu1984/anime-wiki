import { User } from "firebase/auth";

export interface UserDoc {
  uid: string;
  animeCollections: string[];
  isAdmin: boolean;
}

export interface InitialUserStateTypes {
  user: User | null;
  userDoc: UserDoc | undefined;
  status: "loading" | "success" | "error" | "idle";
  message: string;
}
