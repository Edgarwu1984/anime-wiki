import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// Redux
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { getAnimes, setAnimes } from 'src/features/anime/animeSlice';
// Components
import AnimeList from 'src/components/AnimeList';
import Container from 'src/components/common/Container';
import Text from 'src/components/common/Text';
import Layout from 'src/components/Layout';
import Hero from 'src/components/Layout/Hero';
import SectionTitle from 'src/components/SectionTitle';
// Utils
import ResetPagePosition from 'src/utils/resetPagePosition';

type FormData = {
  keyword: string;
};

const CategoriesPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { animes, status } = useAppSelector(state => state.anime);
  const { handleSubmit, register, reset } = useForm<FormData>();

  ResetPagePosition(pathname);

  useEffect(() => {
    dispatch(getAnimes());
  }, [dispatch]);

  const onSearch = ({ keyword }: FormData) => {
    const results = animes.filter(
      anime =>
        anime.title.toLowerCase() === keyword.toLowerCase() ||
        anime.title.toLowerCase().includes(keyword.toLowerCase()) ||
        anime.description.toLowerCase().includes(keyword.toLowerCase())
    );

    dispatch(setAnimes(results));
    navigate('/categories/results');
    reset();
  };

  return (
    <Layout>
      <Hero heroType='heroSub' bgImage='/images/bg_categories.png'>
        <Container className='flex flex-col justify-center items-start h-full space-y-4'>
          <Text
            as='h2'
            className='text-sky-500 font-title mb-5 text-center w-full'
          >
            EXPLORE ANIME
          </Text>
          <div className='flex justify-center w-full'>
            <form className='w-full md:w-2/3' onSubmit={handleSubmit(onSearch)}>
              <div className='relative flex items-center'>
                <input
                  className='w-full bg-slate-900 rounded-3xl pl-4 pr-[120px] py-3 border border-slate-900 focus:outline-none focus:border-sky-500 focus:ring-sky-500 placeholder:text-slate-600'
                  type='text'
                  placeholder='Find Your Favourite Animes...'
                  {...register('keyword')}
                />
                <input
                  type='submit'
                  value='SEARCH'
                  className='btn btn-primary absolute right-1 cursor-pointer'
                />
              </div>
            </form>
          </div>
        </Container>
      </Hero>
      <Container>
        <SectionTitle title='Top Rated' />
        <AnimeList data={animes} status={status} />
      </Container>
    </Layout>
  );
};

export default CategoriesPage;
