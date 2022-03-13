import { ReactNode } from "react";
// Components
import Footer from "./Footer";

type Props = {
  children: ReactNode;
  pageTitle?: string;
};

const Layout = ({ pageTitle, children }: Props) => {
  document.title = !pageTitle ? `AnimeWiki` : `AnimeWiki - ${pageTitle}`;

  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
