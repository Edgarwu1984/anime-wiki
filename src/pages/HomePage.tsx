import React from 'react';
import Button from 'src/components/common/ Button';
import Container from 'src/components/common/Container';
import Text from 'src/components/common/Text';
import Layout from 'src/components/layout';
import Hero from 'src/components/layout/Hero';
import { HiArrowSmRight } from 'react-icons/hi';

const HomePage = () => {
  return (
    <Layout>
      <Hero heroType='heroMain' bgImage='images/bg_main.png'>
        <Container className='flex flex-col justify-center items-start h-full'>
          <Text as='h1' className='text-sky-500 font-title mb-5'>
            EXPLORE ANIME
          </Text>
          <Text as='h3' className='w-[70%]'>
            Find your favourite 80s - 90s Anime information, or make your
            contribution to enrich our community
          </Text>
          <Button
            as='button'
            className='btn-primary uppercase flex items-center '
          >
            Go Explore <HiArrowSmRight className='ml-1' size={'1.5rem'} />
          </Button>
          <Button as='button' className='btn-outline'>
            Go Explore
          </Button>
        </Container>
      </Hero>
      <Container>
        <main>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            ratione quidem ut assumenda suscipit tempora qui, magnam, nobis
            amet, minus dolor adipisci eaque aliquid sit facere cupiditate.
            Pariatur officia iure eum possimus in eaque labore accusantium sunt
            dolores fuga, deserunt similique nesciunt quis temporibus ullam
            suscipit, facere necessitatibus velit eius. Corporis autem
            dignissimos debitis veniam magni nesciunt, quas itaque laboriosam
            consequuntur ad consequatur aut architecto maiores quae? Quos
            voluptatum quasi harum ad nihil, assumenda, corporis earum,
            consequuntur dicta reprehenderit quo veritatis eum magni sed fuga
            deserunt. Consectetur exercitationem reprehenderit eveniet officia
            est sapiente veniam blanditiis, adipisci, ea labore facere
            recusandae?
          </p>
        </main>
      </Container>
    </Layout>
  );
};

export default HomePage;
