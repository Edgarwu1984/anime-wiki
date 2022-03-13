type Props = {
  type?: "column";
};

const CardSkeleton = ({ type }: Props) => {
  switch (type) {
    case "column":
      return (
        <div className="relative h-24 w-full animate-pulse rounded-xl  bg-slate-700 p-4 shadow-md shadow-slate-900 transition hover:brightness-110">
          <div className="mb-4 h-6 w-[40%] rounded-md bg-slate-800 " />
          <div className="h-6 w-[20%] rounded-md bg-slate-800 " />
        </div>
      );
    default:
      return (
        <div className="card  relative flex w-60 animate-pulse flex-col rounded-2xl">
          <div className="card-image-wrap mb-4 h-[20rem] w-full overflow-hidden rounded-2xl bg-slate-700 " />
          <div className="h-12 rounded-2xl bg-slate-700 " />
        </div>
      );
  }
};

export default CardSkeleton;
