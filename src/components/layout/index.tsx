import { ReactNode } from "react";
// Components
import Footer from "./Footer";

type Props = {
  children: ReactNode;
  pageTitle?: string;
};

const Index = ({ pageTitle, children }: Props) => {
  document.title = !pageTitle ? `AnimeWiki` : `AnimeWiki - ${pageTitle}`;

  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default Index;
