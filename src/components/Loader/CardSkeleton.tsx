const CardSkeleton = (key: any) => {
  return (
    <div
      className='relative card w-60 flex flex-col rounded-2xl animate-pulse'
      key={key}
    >
      <div className='card-image-wrap w-full h-[20rem] rounded-2xl overflow-hidden bg-slate-800 mb-4 ' />
      <div className='h-12 bg-slate-800 rounded-2xl ' />
    </div>
  );
};

export default CardSkeleton;
