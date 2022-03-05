export interface UserDoc {
  uid: string;
  username: string | null;
  photo: string | null;
  email: string | null;
  animeCollections: any[];
  isAdmin: boolean;
  lastSignInTime: string | undefined;
}
