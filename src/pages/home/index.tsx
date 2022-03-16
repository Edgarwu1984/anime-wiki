import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
// Components
import Button from "src/components/common/Button";
import Container from "src/components/common/Container";
import Text from "src/components/common/Text";
import Layout from "src/components/layout";
import Hero from "src/components/layout/Hero";
import SectionTitle from "src/components/SectionTitle";
import AnimeList from "src/components/AnimeList";
import FeatureCard from "src/components/FeatureCard";
// Icons
import { HiArrowSmRight } from "react-icons/hi";
// Redux
import { useAppDispatch, useAppSelector } from "src/app/store";
import { getTopAnimes } from "src/features/anime/animeSlice";
// Utils
import ResetPagePosition from "src/utils/resetPagePosition";

const HomePage = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { topAnimes, status } = useAppSelector((state) => state.anime);

  ResetPagePosition(pathname);

  useEffect(() => {
    dispatch(getTopAnimes());
  }, [dispatch]);

  // Anchor Link
  const anchorRef = useRef<null | HTMLDivElement>(null);
  const navToHash = () => {
    if (anchorRef) {
      anchorRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
  };

  return (
    <Layout>
      <Hero heroType="heroMain" bgImage="/images/bg_main.png">
        <Container className="flex h-full flex-col items-start justify-center">
          <Text as="h1" className="mb-5 font-title text-sky-500">
            EXPLORE ANIME
          </Text>
          <Text as="h3" className="mb-8 w-[70%]">
            Find your favourite 80s - 90s Anime information, or make your
            contribution to enrich our community
          </Text>
          <Button
            as="button"
            onClick={navToHash}
            className="btn-primary flex items-center uppercase "
          >
            Go Explore <HiArrowSmRight className="ml-1" size={"1.5rem"} />
          </Button>
        </Container>
      </Hero>
      <Container>
        <section ref={anchorRef}>
          <SectionTitle title="Iconic 80's" />
          <FeatureCard cardCategory="80s" imagePosition="left" />
        </section>
        <section>
          <SectionTitle title="Iconic 90's" />
          <FeatureCard cardCategory="90s" imagePosition="right" />
        </section>
        <section>
          <SectionTitle title="Top Rated" />
          <AnimeList data={topAnimes} status={status} />
        </section>
      </Container>
    </Layout>
  );
};

export default HomePage;
