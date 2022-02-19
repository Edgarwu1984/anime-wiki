import { ReactNode } from 'react';
// Components
import Footer from './Footer';
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
