import React from 'react';
import Container from 'src/components/common/Container';
import Text from 'src/components/common/Text';
import Layout from 'src/components/Layout';
import Hero from 'src/components/Layout/Hero';
import SectionTitle from 'src/components/SectionTitle';

const CategoriesPage = () => {
  return (
    <Layout>
      <Hero heroType='heroSub' bgImage='/images/bg_categories.png'>
        <Container className='flex flex-col justify-center items-start h-full'>
          <Text as='h2' className='text-sky-500 font-title mb-5'>
            EXPLORE ANIME
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
  );
};

export default CategoriesPage;
