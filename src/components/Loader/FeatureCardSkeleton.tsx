type Props = {
  imagePosition: 'left' | 'right';
};

const FeatureCardSkeleton = ({ imagePosition }: Props) => {
  return (
    <div
      className={`md:h-[350px] w-full space-y-4 md:gap-4 md:space-y-0 flex items-center rounded-2xl bg-slate-700 p-3 md:p-4 lg:p-5 flex-col ${
        imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
      } animate-pulse`}
    >
      <div className=' bg-slate-500 w-full h-[200px]  md:w-1/2 md:h-full rounded-2xl' />
      <div className=' w-full  md:w-1/2 h-full space-y-4'>
        <div className='bg-slate-500 h-16 w-full rounded-2xl' />
        <div className='bg-slate-500 h-40 w-full rounded-2xl' />
        <div className='bg-slate-500 h-10 w-40 rounded-2xl' />
      </div>
    </div>
  );
};

export default FeatureCardSkeleton;
