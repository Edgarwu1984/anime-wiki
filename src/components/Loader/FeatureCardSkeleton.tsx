type Props = {
  imagePosition: "left" | "right";
};

const FeatureCardSkeleton = ({ imagePosition }: Props) => {
  return (
    <div
      className={`flex w-full flex-col items-center space-y-4 rounded-2xl bg-slate-700 p-3 md:h-[360px] md:gap-4 md:space-y-0 md:p-4 lg:p-5 ${
        imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse"
      } animate-pulse`}
    >
      <div className=" h-[200px] w-full rounded-2xl  bg-slate-500 md:h-full md:w-1/2" />
      <div className=" h-full  w-full space-y-4 md:w-1/2">
        <div className="h-16 w-full rounded-2xl bg-slate-500" />
        <div className="h-40 w-full rounded-2xl bg-slate-500" />
        <div className="h-10 w-40 rounded-2xl bg-slate-500" />
      </div>
    </div>
  );
};

export default FeatureCardSkeleton;
