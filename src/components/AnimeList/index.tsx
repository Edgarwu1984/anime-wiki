import { Anime } from "src/types/AnimeTypes";
import Card from "src/components/Card";
import Text from "src/components/common/Text";
import CardSkeleton from "../Loader/CardSkeleton";

type AnimeListProps = {
  data: Anime[];
  status: "loading" | "success" | "error" | "idle";
  listType?: "row";
};

const AnimeList = ({ data, status, listType }: AnimeListProps) => {
  const cardSkeletonList = [1, 2, 3, 4];

  switch (listType) {
    case "row":
      return (
        <div>
          {status === "loading" ? (
            <div className="grid grid-cols-1 justify-items-center gap-12 md:grid-cols-3 lg:grid-cols-4 ">
              {cardSkeletonList.map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : data.length === 0 ? (
            <div
              className={`relative z-0 h-[400px] overflow-hidden  rounded-2xl bg-slate-800 `}
            >
              <div className=" absolute -z-10 h-full w-full bg-gradient-to-tr from-slate-900/70 to-sky-700/25" />
              <img
                src="/images/notfound.jpeg"
                alt="not_found"
                className="absolute left-0 top-0 -z-20 h-full w-full object-cover"
              />
              <div className="flex h-full items-center">
                <Text as="h2" className=" mb-5 w-full text-center font-title">
                  No Animes Be Found
                </Text>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              {data.map((anime) => (
                <Card
                  cardType="row"
                  id={anime.id}
                  key={anime.slug}
                  slug={anime.slug}
                  title={anime.title}
                  releaseYear={anime.releaseYear}
                  coverImage={anime.coverImage}
                  likes={anime.likes}
                />
              ))}
            </div>
          )}
        </div>
      );

    default:
      return (
        <div>
          {status === "loading" ? (
            <div className="grid grid-cols-1 justify-items-center gap-12 md:grid-cols-3 lg:grid-cols-4 ">
              {cardSkeletonList.map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : data.length === 0 ? (
            <div
              className={`relative z-0 h-[400px] overflow-hidden  rounded-2xl bg-slate-800 `}
            >
              <div className=" absolute -z-10 h-full w-full bg-gradient-to-tr from-slate-900/70 to-sky-700/25" />
              <img
                src="/images/notfound.jpeg"
                alt="not_found"
                className="absolute left-0 top-0 -z-20 h-full w-full object-cover"
              />
              <div className="flex h-full items-center">
                <Text as="h2" className=" mb-5 w-full text-center font-title">
                  No Animes Be Found
                </Text>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 justify-items-center gap-12 md:grid-cols-3 lg:grid-cols-4 ">
              {data.map((anime) => (
                <Card
                  id={anime.id}
                  key={anime.slug}
                  slug={anime.slug}
                  title={anime.title}
                  releaseYear={anime.releaseYear}
                  coverImage={anime.coverImage}
                  likes={anime.likes}
                />
              ))}
            </div>
          )}
        </div>
      );
  }
};

export default AnimeList;
