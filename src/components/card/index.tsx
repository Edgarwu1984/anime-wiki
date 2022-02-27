import { Link } from 'react-router-dom';
// Components
import Text from 'src/components/common/Text';
// React Icons
import { FaRegHeart, FaRegClock } from 'react-icons/fa';
// Types
import { Anime } from 'src/types/AnimeTypes';

type CardProps = Omit<
  Anime,
  | 'category'
  | 'genre'
  | 'region'
  | 'directedBy'
  | 'description'
  | 'bannerImage'
  | 'featureImage'
  | 'galleries'
>;

const Card = ({
  id,
  slug,
  title,
  releaseYear,
  coverImage,
  likes,
}: CardProps) => {
  return (
    <Link
      to={`/categories/${id}`}
      key={id}
      className='card w-60 flex flex-col rounded-2xl transition hover:bg-slate-800'
    >
      <div className='card-image-wrap w-full h-[20rem] rounded-2xl overflow-hidden'>
        <img
          className='card-image object-cover w-full transition-transform hover:scale-[105%]'
          src={`${coverImage}`}
          alt={slug}
        />
      </div>
      <div className='card-body h-fit flex flex-col justify-between px-2 py-3'>
        <div className='h-14'>
          <Text as='h5' className='card-title capitalize font-title'>
            {title}
          </Text>
        </div>
        <div className='card-details flex justify-between text-slate-400'>
          <div className='flex items-center space-x-2'>
            <FaRegClock />
            <Text>{releaseYear}</Text>
          </div>
          <div className='flex items-center space-x-2'>
            <Text>{likes}</Text>
            <FaRegHeart />
          </div>
        </div>
      </div>
    </Link>
  );
};

Card.defaultProps = {
  slug: 'slug-placeholder',
  title: 'anime title',
  releaseYear: '1984',
  coverImage: '/images/image_placeholder.png',
  likes: 0,
};

export default Card;
