import { useRef } from 'react';
// Components
import Button from 'src/components/common/ Button';
import Container from 'src/components/common/Container';
import Text from 'src/components/common/Text';
import Layout from 'src/components/Layout';
import Hero from 'src/components/Layout/Hero';
import SectionTitle from 'src/components/SectionTitle';
import AnimeList from 'src/components/AnimeList';
import FeatureCard from 'src/components/FeatureCard';
// Icons
import { HiArrowSmRight } from 'react-icons/hi';

const HomePage = () => {
  // Anchor Link
  const anchorRef = useRef<null | HTMLDivElement>(null);
  const navToHash = () => {
    if (anchorRef) {
      anchorRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center',
      });
    }
  };

  return (
    <Layout>
      <Hero heroType='heroMain' bgImage='/images/bg_main.png'>
        <Container className='flex flex-col justify-center items-start h-full'>
          <Text as='h1' className='text-sky-500 font-title mb-5'>
            EXPLORE ANIME
          </Text>
          <Text as='h3' className='w-[70%] mb-8'>
            Find your favourite 80s - 90s Anime information, or make your
            contribution to enrich our community
          </Text>
          <Button
            as='button'
            onClick={navToHash}
            className='btn-primary uppercase flex items-center '
          >
            Go Explore <HiArrowSmRight className='ml-1' size={'1.5rem'} />
          </Button>
        </Container>
      </Hero>
      <Container>
        <section ref={anchorRef}>
          <SectionTitle title="Iconic 80's" />
          <FeatureCard cardCategory='80s' imagePosition='left' />
        </section>
        <section>
          <SectionTitle title="Iconic 90's" />
          <FeatureCard cardCategory='90s' imagePosition='right' />
        </section>
        <section>
          <SectionTitle title='Top Rated' />
          <AnimeList listType='top' />
        </section>
      </Container>
    </Layout>
  );
};

export default HomePage;
