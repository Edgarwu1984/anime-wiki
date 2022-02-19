import { ReactNode } from 'react';
import Container from '../common/Container';
import Text from '../common/Text';
import Footer from './Footer';
import Hero from './Hero';
import Navbar from './Navbar';

type Props = {
  children: ReactNode;
  pageTitle?: String;
};

const Layout = ({ pageTitle, children }: Props) => {
  document.title = `AnimeWiki - ${pageTitle}`;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
