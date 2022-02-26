import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import Container from 'src/components/common/Container';
import Text from 'src/components/common/Text';
import Layout from 'src/components/layout';
import Hero from 'src/components/layout/Hero';
import SectionTitle from 'src/components/SectionTitle';
import { getAnime } from 'src/features/anime/animeSlice';

const AnimePage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { anime, status } = useAppSelector(state => state.anime);

  useEffect(() => {
    dispatch(getAnime(`${params.id}`));
  }, [dispatch, params.id]);
  return (
    <Layout>
      <Hero
        heroType='heroSub'
        bgImage={`https://firebasestorage.googleapis.com/v0/b/anime-wiki-93dac.appspot.com/o/images%2FTeknoman_banner.jpeg?alt=media&token=0c31985a-d9f2-4737-85ac-1aa9d1a127ab`}
      >
        <Container className='flex flex-col justify-center items-start h-full'>
          <Text as='h2' className='text-sky-500 font-title mb-5'>
            {anime.title}
          </Text>
          <Text as='h4' className='w-[70%]'>
            Find your favourite 80s - 90s Anime information, or make your
            contribution to enrich our community
          </Text>
        </Container>
      </Hero>
      <Container>
        <SectionTitle title='Top Rated' />
      </Container>
    </Layout>
  );
};

export default AnimePage;
