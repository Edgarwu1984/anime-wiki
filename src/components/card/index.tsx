import React from 'react';
import { Anime } from 'src/types/AnimeTypes';
import Text from '../common/Text';
import { FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
      className='card w-60 flex flex-col '
    >
      <div className='card-image-wrap w-full h-[20rem] rounded-2xl overflow-hidden'>
        <img
          className='card-image object-cover h-full w-full'
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
          <Text>{releaseYear}</Text>
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
