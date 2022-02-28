import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
// Redux
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { getAnime } from 'src/features/anime/animeSlice';
// Components
import Container from 'src/components/common/Container';
import Text from 'src/components/common/Text';
import Layout from 'src/components/Layout';
import Hero from 'src/components/Layout/Hero';
import Loader from 'src/components/Loader';
import SectionTitle from 'src/components/SectionTitle';
// React Icons
import { FaRegHeart, FaRegClock } from 'react-icons/fa';
// Utils
import ResetPagePosition from 'src/utils/resetPagePosition';
import { MdArrowBackIosNew } from 'react-icons/md';

const AnimePage = () => {
  const params = useParams();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState('');
  const dispatch = useAppDispatch();
  const { anime, status } = useAppSelector(state => state.anime);

  ResetPagePosition(pathname);

  useEffect(() => {
    dispatch(getAnime(`${params.id}`));
  }, [dispatch, params.id]);

  const modalOpenHandler = (imgUrl: string) => {
    setIsOpen(true);
    setImage(imgUrl);
  };

  return (
    <>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <Layout>
          <Transition show={isOpen} as={Fragment}>
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className='fixed z-10 inset-0 overflow-y-auto'
            >
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='flex items-center justify-center min-h-screen'>
                  <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
                  <img
                    className='rounded-2xl w-auto h-[80vh]'
                    src={image}
                    alt='img'
                  />
                </div>
              </Transition.Child>
            </Dialog>
          </Transition>
          <Hero heroType='heroSub' bgImage={anime?.bannerImage}>
            <Container className='flex flex-col justify-center items-start h-full'>
              <div className='w-full mb-4'>
                <Link
                  to='/categories'
                  className='w-fit text-lg flex items-center hover:text-sky-500'
                >
                  <MdArrowBackIosNew />
                  Back
                </Link>
              </div>
              <Text as='h2' className='text-sky-500 font-title mb-5'>
                {anime?.title}
              </Text>
              <div className='space-x-4 mb-3'>
                <Text
                  as='label'
                  className='text-sm w-fit bg-slate-900 text-sky-500 border-[1px] border-sky-500 px-3 py-1 rounded-xl font-medium'
                >
                  {anime?.genre}
                </Text>
                <Text
                  as='label'
                  className='text-sm w-fit bg-slate-900 text-sky-500 border-[1px] border-sky-500 px-3 py-1 rounded-xl font-medium'
                >
                  {anime?.category}
                </Text>
              </div>
              <div className='space-y-2'>
                <div className='flex space-x-4'>
                  <Text>
                    <strong>Release Year:</strong> {anime?.releaseYear}
                  </Text>
                  <Text>
                    <strong>Region:</strong> {anime?.region}
                  </Text>
                </div>
                <Text>
                  <strong>Directed By:</strong> {anime?.directedBy}
                </Text>
                <div className='flex items-center space-x-4'>
                  <Text className='flex items-center text-slate-400'>
                    {anime?.likes} Likes
                  </Text>
                  <FaRegHeart className='mr-2 transition hover:cursor-pointer hover:text-lg' />
                </div>
              </div>
            </Container>
          </Hero>
          <Container>
            <section>
              <SectionTitle title='Intro' />
              <div>
                <img
                  className='w-48 md:w-72 lg:w-96 float-right pl-2 pb-1 rounded-2xl'
                  src={anime?.featureImage}
                  alt={anime?.slug}
                />
                <Text as='p'>{anime?.description}</Text>
              </div>
            </section>
            <section>
              <SectionTitle title='Gallery' />
              <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {anime?.galleries.map((img, i) => (
                  <div
                    key={i}
                    className='rounded-2xl overflow-hidden h-48 w-90  hover:shadow-xl hover:cursor-pointer'
                    onClick={() => modalOpenHandler(img)}
                  >
                    <img
                      className='h-full w-full object-cover object-top  transition-transform hover:scale-[103%]'
                      src={img}
                      alt={`img_${i}`}
                    />
                  </div>
                ))}
              </div>
            </section>
          </Container>
        </Layout>
      )}
    </>
  );
};

export default AnimePage;
