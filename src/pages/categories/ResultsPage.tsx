import { Link } from 'react-router-dom';
import { useAppSelector } from 'src/app/store';
import AnimeList from 'src/components/AnimeList';
import Container from 'src/components/common/Container';
import Text from 'src/components/common/Text';
import Layout from 'src/components/Layout';
import Hero from 'src/components/Layout/Hero';
import SectionTitle from 'src/components/SectionTitle';
import { MdArrowBackIosNew } from 'react-icons/md';

const ResultsPage = () => {
  const { animes, status } = useAppSelector(state => state.anime);
  return (
    <Layout>
      <Hero heroType='heroSub' height='300px' bgImage='/images/bg_galaxy.png'>
        <Container className='flex flex-col justify-center items-start h-full space-y-4'>
          <Text
            as='h2'
            className='text-sky-500 font-title mb-5 text-center w-full'
          >
            {animes.length === 0
              ? 'No results'
              : `You got ${animes.length} ${
                  animes.length > 1 ? 'results' : 'result'
                }`}
          </Text>
          <div className='w-full mb-4'>
            <Link
              to='/categories'
              className='w-fit text-lg flex items-center hover:text-sky-500'
            >
              <MdArrowBackIosNew />
              Back
            </Link>
          </div>
        </Container>
      </Hero>
      <Container>
        <SectionTitle title='Result List' />
        <AnimeList data={animes} status={status} />
      </Container>
    </Layout>
  );
};

export default ResultsPage;
