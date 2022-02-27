import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from 'src/config/db';
import { Anime } from 'src/types/AnimeTypes';

// Get all animes
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

const getTopAnimes = async () => {
  const ref = query(
    collection(db, 'anime_list'),
    orderBy('likes', 'desc'),
    limit(4)
  );
  const snapshot = await getDocs(ref);
  const data = snapshot.docs.map(doc => {
    const id = doc.id;
    const data = doc.data();
    return { id, ...data };
  });

  return data as Anime[];
};

// Get anime by ID
const getAnime = async (id: string) => {
  const ref = doc(db, 'anime_list', id);

  const snapshot = await getDoc(ref);

  const data = snapshot.data();

  return data as Anime;
};

const AnimeService = {
  getAnimes,
  getAnime,
  getTopAnimes,
};

export default AnimeService;
