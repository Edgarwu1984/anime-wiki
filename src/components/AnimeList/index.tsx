import { Anime } from 'src/types/AnimeTypes';
import Card from 'src/components/Card';
import Text from 'src/components/common/Text';
import CardSkeleton from '../Loader/CardSkeleton';

type AnimeListProps = {
  data: Anime[];
  status: 'loading' | 'success' | 'error' | 'idle';
};

const AnimeList = ({ data, status }: AnimeListProps) => {
  const cardSkeletonList = [1, 2, 3, 4];

  return (
    <div>
      {status === 'loading' ? (
        <div className='grid justify-items-center gap-12 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 '>
          {cardSkeletonList.map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : data.length === 0 ? (
        <div
          className={`relative bg-slate-800 rounded-2xl h-[400px]  overflow-hidden z-0 `}
        >
          <div className=' absolute w-full h-full bg-gradient-to-tr from-slate-900/70 to-sky-700/25 -z-10' />
          <img
            src='/images/notfound.jpeg'
            alt='not_found'
            className='absolute w-full h-full left-0 top-0 -z-20 object-cover'
          />
          <div className='h-full flex items-center'>
            <Text as='h2' className=' font-title mb-5 text-center w-full'>
              No Animes Be Found
            </Text>
          </div>
        </div>
      ) : (
        <div className='grid justify-items-center gap-12 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 '>
          {data.map(anime => (
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
