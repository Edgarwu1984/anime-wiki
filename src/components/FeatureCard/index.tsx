import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// Redux
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { getAnimes } from 'src/features/anime/animeSlice';
// Components
import Text from 'src/components/common/Text';
import FeatureCardSkeleton from '../Loader/FeatureCardSkeleton';

type FeatureCardProps = {
  imagePosition: 'left' | 'right';
  cardCategory: '80s' | '90s';
};

const FeatureCard = ({
  imagePosition = 'left',
  cardCategory = '80s',
}: FeatureCardProps) => {
  const dispatch = useAppDispatch();
  const { animes, status } = useAppSelector(state => state.anime);

  useEffect(() => {
    dispatch(getAnimes());
  }, [dispatch]);

  const topRatedAnimes = [...animes].sort((a, b) => b.likes - a.likes);

  const anime = topRatedAnimes.find(anime => anime.category === cardCategory);

  return (
    <>
      {status === 'loading' ? (
        <FeatureCardSkeleton imagePosition={imagePosition} />
      ) : (
        <div
          className={`card w-full space-y-4 md:gap-4 md:space-y-0 flex items-center rounded-2xl bg-slate-700 p-3 md:p-4 lg:p-5 flex-col ${
            imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          <div className='card-image-wrap w-full md:w-1/2 h-full rounded-2xl overflow-hidden'>
            <img
              className='card-image object-cover w-full'
              src={`${anime?.featureImage}`}
              alt={anime?.slug}
            />
          </div>
          <div className='card-body w-full md:w-1/2 h-full flex flex-col px-4 '>
            <div className='md:flex md:items-center md:justify-between'>
              <Text
                as='h4'
                className='card-title capitalize font-title w-full mb-3 md:mb-0 md:w-3/4'
              >
                {anime?.title}
              </Text>
              <Text
                as='label'
                className='text-sm py-1 md:text-base md:py-0 w-fit bg-sky-500 px-3 rounded-xl font-medium'
              >
                {anime?.genre}
              </Text>
            </div>
            <div className='card-details  text-slate-400'>
              <Text
                as='p'
                className='line-clamp-3 md:line-clamp-4 lg:line-clamp-6'
              >
                {anime?.description}
              </Text>
              <Link
                className='text-sky-500 hover:underline'
                to={`/categories/${anime?.id}`}
              >
                Read More...
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeatureCard;
