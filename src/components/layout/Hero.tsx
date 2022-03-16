import { ReactNode } from "react";
import Navbar from "src/components/layout/Navbar";

type HeroProps = {
  children: ReactNode;
  heroType?: "heroMain" | "heroSub";
  bgImage?: string;
  height?: string;
};

const Hero = ({
  heroType = "heroMain",
  bgImage,
  height = "400px",
  children,
}: HeroProps) => {
  switch (heroType) {
    case "heroMain":
      return (
        <div
          className={`relative z-0 h-[calc(100vh-1rem)] overflow-hidden  rounded-2xl bg-slate-800 shadow-2xl shadow-slate-900 md:h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-6.5rem)]`}
        >
          <Navbar />
          <div className=" absolute -z-10 h-full w-full bg-gradient-to-tr from-slate-900/95 to-sky-700/75" />
          <img
            src={bgImage}
            alt="hero_image"
            className="absolute left-0 top-0 -z-20 h-full w-full object-cover"
          />
          <div className="mt-[64px] h-[calc(100%-4rem)] px-2 md:px-4">
            {children}
          </div>
        </div>
      );

    case "heroSub":
      return (
        <div
          className={`relative rounded-2xl bg-slate-800 h-[${height}]   z-0 overflow-hidden shadow-2xl shadow-slate-900`}
        >
          <Navbar />
          <div className=" absolute -z-10 h-full w-full bg-gradient-to-tr from-slate-900/95 to-sky-700/75" />
          <img
            src={bgImage}
            alt="hero_image"
            className="absolute left-0 top-0 -z-20 h-full w-full object-cover"
          />
          <div className="mt-[64px] h-[calc(100%-4rem)] px-2 md:px-4 lg:px-0">
            {children}
          </div>
        </div>
      );
  }
};

export default Hero;
