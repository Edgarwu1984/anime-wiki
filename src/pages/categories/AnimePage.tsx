import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
// Redux
import { useAppDispatch, useAppSelector } from "src/app/store";
import { getAnime, likeAnime } from "src/features/anime/animeSlice";
// Components
import Container from "src/components/common/Container";
import Text from "src/components/common/Text";
import Layout from "src/components/Layout";
import Hero from "src/components/Layout/Hero";
import Loader from "src/components/Loader";
import SectionTitle from "src/components/SectionTitle";
// React Icons
import { FaRegHeart, FaRegClock } from "react-icons/fa";
// Utils
import ResetPagePosition from "src/utils/resetPagePosition";
import { MdArrowBackIosNew } from "react-icons/md";
import { Anime } from "src/types/AnimeTypes";

const AnimePage = () => {
  const params = useParams();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");
  const dispatch = useAppDispatch();
  const { anime, status } = useAppSelector((state) => state.anime);
  const { user } = useAppSelector((state) => state.user);

  ResetPagePosition(pathname);

  useEffect(() => {
    dispatch(getAnime(`${params.id}`));
  }, [dispatch, params.id]);

  const modalOpenHandler = (imgUrl: string) => {
    setIsOpen(true);
    setImage(imgUrl);
  };

  const likeHandler = (id: string, data: Anime) => {
    dispatch(likeAnime({ id: id, animeData: data, userData: user }));
    dispatch(getAnime(`${params.id}`));
  };

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
        <Layout>
          <Transition show={isOpen} as={Fragment}>
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className="fixed inset-0 z-10 overflow-y-auto"
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="flex min-h-screen items-center justify-center">
                  <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                  <img
                    className="h-[80vh] w-auto rounded-2xl"
                    src={image}
                    alt="img"
                  />
                </div>
              </Transition.Child>
            </Dialog>
          </Transition>
          <Hero heroType="heroSub" bgImage={anime?.bannerImage}>
            <Container className="flex h-full flex-col items-start justify-center">
              <div className="mb-4 w-full">
                <Link
                  to="/categories"
                  className="flex w-fit items-center text-lg hover:text-sky-500"
                >
                  <MdArrowBackIosNew />
                  Back
                </Link>
              </div>
              <Text as="h2" className="mb-5 font-title text-sky-500">
                {anime?.title}
              </Text>
              <div className="mb-3 space-x-4">
                <Text
                  as="label"
                  className="w-fit rounded-xl border-[1px] border-sky-500 bg-slate-900 px-3 py-1 text-sm font-medium text-sky-500"
                >
                  {anime?.genre}
                </Text>
                <Text
                  as="label"
                  className="w-fit rounded-xl border-[1px] border-sky-500 bg-slate-900 px-3 py-1 text-sm font-medium text-sky-500"
                >
                  {anime?.category}
                </Text>
              </div>
              <div className="space-y-2">
                <div className="flex space-x-4">
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
                <div className="flex items-center space-x-4">
                  <Text className="flex items-center text-slate-400">
                    {anime?.likes} Likes
                  </Text>
                  <FaRegHeart
                    className="mr-2 transition hover:cursor-pointer hover:text-lg"
                    onClick={() => likeHandler(anime.id, anime)}
                  />
                </div>
              </div>
            </Container>
          </Hero>
          <Container>
            <section>
              <SectionTitle title="Intro" />
              <div>
                <img
                  className="float-right w-48 rounded-2xl pl-2 pb-1 md:w-72 lg:w-96"
                  src={anime?.featureImage}
                  alt={anime?.slug}
                />
                <Text as="p">{anime?.description}</Text>
              </div>
            </section>
            <section>
              <SectionTitle title="Gallery" />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {anime?.galleries.map((img, i) => (
                  <div
                    key={i}
                    className="w-90 h-48 overflow-hidden rounded-2xl  hover:cursor-pointer hover:shadow-xl"
                    onClick={() => modalOpenHandler(img)}
                  >
                    <img
                      className="h-full w-full object-cover object-top  transition-transform hover:scale-[103%]"
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
