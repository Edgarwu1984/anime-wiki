import { useEffect } from "react";
import { Link } from "react-router-dom";
// Redux
import { useAppDispatch, useAppSelector } from "src/app/store";
import { getAnimes } from "src/features/anime/animeSlice";
// Components
import Text from "src/components/common/Text";
import FeatureCardSkeleton from "./Loader/FeatureCardSkeleton";

type FeatureCardProps = {
  imagePosition: "left" | "right";
  cardCategory: "80s" | "90s";
};

const FeatureCard = ({
  imagePosition = "left",
  cardCategory = "80s",
}: FeatureCardProps) => {
  const dispatch = useAppDispatch();
  const { animes, status } = useAppSelector((state) => state.anime);

  useEffect(() => {
    dispatch(getAnimes());
  }, [dispatch]);

  const topRatedAnimes = [...animes].sort((a, b) => b.likes - a.likes);

  const anime = topRatedAnimes.find((anime) => anime.category === cardCategory);

  return (
    <>
      {status === "loading" ? (
        <FeatureCardSkeleton imagePosition={imagePosition} />
      ) : !anime ? (
        <div className="flex h-40 w-full items-center justify-center rounded-2xl bg-slate-700">
          <Text as="h3" className="font-title">
            No Data
          </Text>
        </div>
      ) : (
        <div
          className={`card flex w-full flex-col items-center space-y-4 rounded-2xl bg-slate-700 p-3 md:gap-4 md:space-y-0 md:p-4 lg:p-5 ${
            imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <div className="card-image-wrap h-[360px] w-full overflow-hidden rounded-2xl md:w-1/2">
            <img
              className="card-image w-full object-cover object-center"
              src={`${anime?.featureImage}`}
              alt={anime?.slug}
            />
          </div>
          <div className="card-body flex h-full w-full flex-col px-4 md:w-1/2 ">
            <div className="md:flex md:items-center md:justify-between">
              <Text
                as="h4"
                className="card-title mb-3 w-full font-title capitalize md:mb-0 md:w-3/4"
              >
                {anime?.title}
              </Text>
              <Text
                as="label"
                className="w-fit rounded-xl bg-sky-500 py-1 px-3 text-sm font-medium md:py-0 md:text-base"
              >
                {anime?.genre}
              </Text>
            </div>
            <div className="card-details  text-slate-400">
              <Text
                as="p"
                className="line-clamp-3 md:line-clamp-4 lg:line-clamp-6"
              >
                {anime?.description}
              </Text>
              <Link
                className="text-sky-500 hover:underline"
                to={`/categories/${anime?.id}`}
              >
                Read More...
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeatureCard;
