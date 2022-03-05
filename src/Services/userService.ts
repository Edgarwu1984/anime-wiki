import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "src/config/db";
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
    username: userData.user.displayName,
    photo: userData.user.photoURL,
    email: userData.user.email,
    animeCollections: [],
    isAdmin: false,
    lastSignInTime: userData.user.metadata.lastSignInTime,
  };

  await setDoc(doc(db, "users", userData.user.uid), userDoc);

  // Save userInfo to localStorage
  const user = {
    id: userData.user.uid,
    username: userData.user.displayName,
    email: userData.user.email,
    lastSignInTime: userData.user.metadata.lastSignInTime,
  };

  const token = await userData.user.getIdToken();

  const localStorageData = { user, token };

  localStorage.setItem("userInfo", JSON.stringify(localStorageData));

  return userDoc;
};

// Login User
const loginUser = async (email: string, password: string) => {
  const userData = await signInWithEmailAndPassword(auth, email, password);

  const userDoc = await getUser(userData.user.uid);

  const user: UserDoc = {
    uid: userData.user.uid,
    username: userData.user.displayName,
    email: userData.user.email,
    photo: userData.user.photoURL,
    lastSignInTime: userData.user.metadata.lastSignInTime,
    isAdmin: userDoc?.isAdmin,
    animeCollections: userDoc?.animeCollections,
  };
  const token = await userData.user.getIdToken();

  const localStorageData = { user, token };

  localStorage.setItem("userInfo", JSON.stringify(localStorageData));

  return user;
};

// Get User by ID
const getUser = async (id: string) => {
  const userRef = doc(db, "users", id);
  const userSnapshot = await getDoc(userRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data();
  }
};

// Update User by Id
const updateUser = async (id: string, data: UserDoc) => {
  const userRef = doc(db, "users", id);
  return await updateDoc(userRef, { ...data });
};

const UserService = {
  signupUser,
  loginUser,
  getUser,
  updateUser,
};

export default UserService;
