import { ReactNode } from 'react';
import Container from '../common/Container';

type HeroProps = {
  children: ReactNode;
  heroType?: 'heroMain' | 'heroSub';
  bgImage?: string;
};

const Hero = ({ heroType = 'heroMain', bgImage, children }: HeroProps) => {
  const heroHeight =
    heroType === 'heroMain'
      ? 'h-[calc(100vh-4rem*2)]'
      : heroType === 'heroSub' && 'h-[520px]';

  return (
    <div
      className={`relative bg-slate-800 rounded-2xl mt-[-96px] ${heroHeight}  overflow-hidden z-0 shadow-slate-900 shadow-2xl`}
    >
      <div className=' absolute w-full h-full bg-gradient-to-tr from-slate-900/95 to-sky-700/75 -z-10' />
      <div className=' absolute w-full bg-hero h-full bg-no-repeat bg-cover bg-center -z-20' />
      <div className='mt-[64px] h-[calc(100%-4rem)] '>{children}</div>
    </div>
  );
};

export default Hero;
