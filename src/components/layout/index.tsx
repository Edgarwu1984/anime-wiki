import { ReactNode } from "react";
import Footer from "src/components/layout/Footer";
// Components

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
