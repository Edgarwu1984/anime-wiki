import { ReactNode } from 'react';
import Navbar from './Navbar';

type HeroProps = {
  children: ReactNode;
  heroType?: 'heroMain' | 'heroSub';
  bgImage?: string;
};

const Hero = ({ heroType = 'heroMain', bgImage, children }: HeroProps) => {
  switch (heroType) {
    case 'heroMain':
      return (
        <div
          className={`relative bg-slate-800 rounded-2xl h-[calc(100vh-1rem)]  md:h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-6.5rem)] overflow-hidden z-0 shadow-slate-900 shadow-2xl`}
        >
          <Navbar />
          <div className=' absolute w-full h-full bg-gradient-to-tr from-slate-900/95 to-sky-700/75 -z-10' />
          <div
            className={`${bgImage} absolute w-full h-full bg-no-repeat bg-cover bg-center -z-20`}
          />
          <div className='mt-[64px] h-[calc(100%-4rem)] px-2 md:px-4 lg:px-0'>
            {children}
          </div>
        </div>
      );

    case 'heroSub':
      return (
        <div
          className={`relative bg-slate-800 rounded-2xl h-[400px]   overflow-hidden z-0 shadow-slate-900 shadow-2xl`}
        >
          <Navbar />
          <div className=' absolute w-full h-full bg-gradient-to-tr from-slate-900/95 to-sky-700/75 -z-10' />
          <div
            className={`${bgImage} absolute w-full h-full bg-no-repeat bg-cover bg-center -z-20`}
          />
          <div className='mt-[64px] h-[calc(100%-4rem)] px-2 md:px-4 lg:px-0'>
            {children}
          </div>
        </div>
      );
  }
};

export default Hero;
