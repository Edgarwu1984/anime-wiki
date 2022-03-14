import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
// Redux
import { useAppDispatch, useAppSelector } from "src/app/store";
import { getAnimeById, likeAnime } from "src/features/anime/animeSlice";
import {
  getUserAnimeCollection,
  getUserDoc,
} from "src/features/user/userSlice";
// Components
import Container from "src/components/common/Container";
import Text from "src/components/common/Text";
import Layout from "src/components/Layout";
import Hero from "src/components/Layout/Hero";
import SectionTitle from "src/components/SectionTitle";
import AlertModal from "src/components/Modal/AlertModal";
import ImageModal from "src/components/Modal/ImageModal";
// React Icons
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { CgSpinnerTwo } from "react-icons/cg";
import { MdArrowBackIosNew } from "react-icons/md";
// Utils
import ResetPagePosition from "src/utils/resetPagePosition";
import Loader from "src/components/Loader";

const AnimePage = () => {
  const params = useParams();
  const { pathname } = useLocation();
  const navigator = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");
  // Redux Selector
  const dispatch = useAppDispatch();
  const {
    anime,
    status,
    message: AnimeMessage,
    messageType: animeMessageType,
  } = useAppSelector((state) => state.anime);
  const { user, userDoc } = useAppSelector((state) => state.user);

  ResetPagePosition(pathname);

  const hasCollected = userDoc.animeCollections.some(
    (item) => item === params.id
  );

  useEffect(() => {
    dispatch(getAnimeById(`${params.id}`));
    if (user) {
      dispatch(getUserAnimeCollection(user?.uid));
      dispatch(getUserDoc(user?.uid));
    }
  }, [dispatch, params.id, user, user?.uid]);

  const modalOpenHandler = (imgUrl: string) => {
    setIsOpen(true);
    setImage(imgUrl);
  };

  const likeHandler = () => {
    if (!user) {
      navigator("/login");
    } else {
      dispatch(likeAnime({ anime, user }));
    }
  };

  return status === "loading" ? (
    <Loader />
  ) : (
    <Layout pageTitle={`${anime.title}`}>
      {AnimeMessage && (
        <AlertModal
          message={AnimeMessage}
          type={animeMessageType}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <ImageModal isOpen={isOpen} setIsOpen={setIsOpen} image={image} />
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
          <div className="mb-6 space-x-4">
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
          <div className="space-y-3">
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
              {status === "loading_like" ? (
                <CgSpinnerTwo className="mr-2 animate-spin text-xl text-slate-500" />
              ) : hasCollected ? (
                <FaHeart
                  className="mr-2 text-red-600 transition hover:cursor-pointer hover:text-lg"
                  onClick={likeHandler}
                />
              ) : (
                <FaRegHeart
                  className="mr-2 transition hover:cursor-pointer hover:text-lg"
                  onClick={likeHandler}
                />
              )}
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
            {anime?.galleries?.map((img, i) => (
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
  );
};

export default AnimePage;
