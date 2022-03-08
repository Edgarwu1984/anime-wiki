import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  User,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "src/config/db";
import { Anime } from "src/types/AnimeTypes";
import { UserDoc } from "src/types/UserTypes";

// Sign up User
const signupUser = async (
  username: string,
  email: string,
  password: string
) => {
  const userData = await createUserWithEmailAndPassword(auth, email, password);

  // Set default user photo
  await updateProfile(userData.user, {
    displayName: username,
    photoURL:
      "https://firebasestorage.googleapis.com/v0/b/anime-wiki-93dac.appspot.com/o/user_images%2Fuser-icon-dark.png?alt=media&token=0c6096c4-6c6a-4d7d-ba1e-85640c8165bd",
  });

  // Create user document
  const userDoc: UserDoc = {
    uid: userData.user.uid,
    animeCollections: [],
    isAdmin: false,
  };

  await setDoc(doc(db, "users", userData.user.uid), userDoc);

  return userData.user;
};

// Login User
const loginUser = async (email: string, password: string) => {
  const userData = await signInWithEmailAndPassword(auth, email, password);

  return userData.user;
};

// Log out User
const logoutUser = async () => {
  await signOut(auth);
};

// Get User by ID
const getUserById = async (id: string) => {
  const userRef = doc(db, "users", id);
  const userSnapshot = await getDoc(userRef);

  if (userSnapshot.exists()) {
    const userDoc = userSnapshot.data() as UserDoc;
    return userDoc;
  }
};

// Update User Profile
const updateUserProfile = async (
  userData: User | null,
  formData: { photo: string | null; username: string | null }
) => {
  const { photo, username } = formData;
  if (userData !== null) {
    await updateProfile(userData, {
      displayName: username,
      photoURL: photo,
    });
  }
};

// Update User by Id
const updateUserById = async (id: string, data: UserDoc) => {
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, { ...data });
  const user = await getUserById(id);
  return user as UserDoc;
};

// Delete User by Id
const deleteUserById = async (id: string) => {
  const userRef = doc(db, "users", id);
  return await deleteDoc(userRef);
};

// Get User's animes
const getUserAnimes = async (uid: string) => {
  const user = await getUserById(uid);
  const animeIdArray = user?.animeCollections;
  const animeRef = query(
    collection(db, "anime_list"),
    where("id", "in", animeIdArray)
  );

  const querySnapshot = await getDocs(animeRef);

  const data = querySnapshot.docs.map((doc) => {
    const id = doc.id;
    const data = doc.data();
    return { id, ...data };
  });

  return data as Anime[];
};

const UserService = {
  signupUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserAnimes,
};

export default UserService;
