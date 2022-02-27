import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import Container from 'src/components/common/Container';
import Text from 'src/components/common/Text';
import Layout from 'src/components/Layout';
import Hero from 'src/components/Layout/Hero';
import Loader from 'src/components/Loader';
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
    <>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <Layout>
          <Hero heroType='heroSub' bgImage={anime.bannerImage}>
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
      )}
    </>
  );
};

export default AnimePage;
