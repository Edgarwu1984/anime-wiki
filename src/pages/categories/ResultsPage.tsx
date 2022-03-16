import { Link } from "react-router-dom";
import { useAppSelector } from "src/app/store";
import AnimeList from "src/components/AnimeList";
import Container from "src/components/common/Container";
import Text from "src/components/common/Text";
import Layout from "src/components/layout";
import Hero from "src/components/layout/Hero";
import SectionTitle from "src/components/SectionTitle";
import { MdArrowBackIosNew } from "react-icons/md";

const ResultsPage = () => {
  const { animes, status } = useAppSelector((state) => state.anime);
  return (
    <Layout>
      <Hero heroType="heroSub" height="300px" bgImage="/images/bg_galaxy.png">
        <Container className="flex h-full flex-col items-start justify-center space-y-4">
          <Text
            as="h2"
            className="mb-5 w-full text-center font-title text-sky-500"
          >
            {animes.length === 0
              ? "No results"
              : `You got ${animes.length} ${
                  animes.length > 1 ? "results" : "result"
                }`}
          </Text>
          <div className="mb-4 w-full">
            <Link
              to="/categories"
              className="flex w-fit items-center text-lg hover:text-sky-500"
            >
              <MdArrowBackIosNew />
              Back
            </Link>
          </div>
        </Container>
      </Hero>
      <Container>
        <SectionTitle title="Result List" />
        <AnimeList data={animes} status={status} />
      </Container>
    </Layout>
  );
};

export default ResultsPage;
