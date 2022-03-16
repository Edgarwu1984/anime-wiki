import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// Redux
import { useAppDispatch, useAppSelector } from "src/app/store";
import { getAnimes, setAnimes } from "src/features/anime/animeSlice";
// Components
import AnimeList from "src/components/AnimeList";
import Container from "src/components/common/Container";
import Text from "src/components/common/Text";
import Layout from "src/components/layout";
import Hero from "src/components/layout/Hero";
import SectionTitle from "src/components/SectionTitle";
// Utils
import ResetPagePosition from "src/utils/resetPagePosition";

type FormData = {
  keyword: string;
};

const CategoriesPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { animes, status } = useAppSelector((state) => state.anime);
  const { handleSubmit, register, reset } = useForm<FormData>();

  ResetPagePosition(pathname);

  useEffect(() => {
    dispatch(getAnimes());
  }, [dispatch]);

  const onSearch = ({ keyword }: FormData) => {
    const results = animes.filter(
      (anime) =>
        anime.title.toLowerCase() === keyword.toLowerCase() ||
        anime.title.toLowerCase().includes(keyword.toLowerCase()) ||
        anime.description.toLowerCase().includes(keyword.toLowerCase())
    );

    dispatch(setAnimes(results));
    navigate("/categories/results");
    reset();
  };

  return (
    <Layout pageTitle="Categories">
      <Hero heroType="heroSub" bgImage="/images/bg_categories.png">
        <Container className="flex h-full flex-col items-start justify-center space-y-4">
          <Text
            as="h2"
            className="mb-5 w-full text-center font-title text-sky-500"
          >
            EXPLORE ANIME
          </Text>
          <div className="flex w-full justify-center">
            <form className="w-full md:w-2/3" onSubmit={handleSubmit(onSearch)}>
              <div className="relative flex items-center">
                <input
                  className="w-full rounded-3xl border border-slate-900 bg-slate-900 py-3 pl-4 pr-[120px] placeholder:text-slate-600 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                  type="text"
                  placeholder="Find Your Favourite Animes..."
                  {...register("keyword")}
                />
                <input
                  type="submit"
                  value="SEARCH"
                  className="btn btn-primary absolute right-1 cursor-pointer"
                />
              </div>
            </form>
          </div>
        </Container>
      </Hero>
      <Container>
        <SectionTitle title="Animes" />
        <AnimeList data={animes} status={status} />
      </Container>
    </Layout>
  );
};

export default CategoriesPage;
