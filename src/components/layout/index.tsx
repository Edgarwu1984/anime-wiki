import { ReactNode } from "react";
// Components
import Footer from "./Footer";

type Props = {
  children: ReactNode;
  pageTitle?: String;
};

const Layout = ({ pageTitle, children }: Props) => {
  document.title = `AnimeWiki`;

  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
