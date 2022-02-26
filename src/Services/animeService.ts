import {
  collection,
  // query,
  getDocs,
  // doc,
  // setDoc,
  // addDoc,
  DocumentData,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from 'src/config/db';
import { Anime } from 'src/types/AnimeTypes';

const getAnimes = async () => {
  const ref = collection(db, 'anime_list');

  const snapshot = await getDocs(ref);

  const data = snapshot.docs.map(doc => {
    const id = doc.id;
    const data = doc.data();
    return { id, ...data };
  });

  return data as Anime[];
};

const getAnime = async (id: string) => {
  const ref = doc(db, 'anime_list', id);

  const snapshot = await getDoc(ref);

  const data = snapshot.data();

  return data as Anime;
};

const AnimeService = {
  getAnimes,
  getAnime,
};

export default AnimeService;
