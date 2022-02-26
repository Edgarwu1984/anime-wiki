import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { getAnimes } from 'src/features/anime/animeSlice';
import animeService from 'src/Services/animeService';
import Card from './card';
import Text from './common/Text';

const AnimeList = () => {
  const dispatch = useAppDispatch();
  const { animes, status } = useAppSelector(state => state.anime);
  useEffect(() => {
    dispatch(getAnimes());
    animeService.getAnime('3427e440-9637-11ec-ae80-d16d71abab38');
  }, [dispatch]);
  return (
    <div className='py-6'>
      {status === 'loading' ? (
        <Text>Loading...</Text>
      ) : animes.length === 0 ? (
        <div>
          <Text>No Animes</Text>
        </div>
      ) : (
        <div className='grid justify-items-center gap-12 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 '>
          {animes.map(anime => (
            <Card
              id={anime.id}
              key={anime.slug}
              slug={anime.slug}
              title={anime.title}
              releaseYear={anime.releaseYear}
              coverImage={anime.coverImage}
              likes={anime.likes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimeList;
