import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { getAnimes, getTopAnimes } from 'src/features/anime/animeSlice';
import Card from '../Card';
import Text from '../common/Text';
import CardSkeleton from '../Loader/CardSkeleton';

type AnimeListProps = {
  listType: '80s' | '90s' | 'top';
};

const AnimeList = ({ listType }: AnimeListProps) => {
  const cardSkeletonList = [1, 2, 3, 4];
  const dispatch = useAppDispatch();
  const { animes, status } = useAppSelector(state => state.anime);
  useEffect(() => {
    if (listType === 'top') {
      dispatch(getTopAnimes());
    } else {
      dispatch(getAnimes());
    }
  }, [dispatch, listType]);

  return (
    <div>
      {status === 'loading' ? (
        <div className='grid justify-items-center gap-12 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 '>
          {cardSkeletonList.map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
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
