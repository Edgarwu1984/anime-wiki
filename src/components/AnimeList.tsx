import { Anime, InitialAnimeState } from "src/types/AnimeTypes";
import Card from "src/components/Card";
import Text from "src/components/common/Text";
import CardSkeleton from "src/components/Loader/CardSkeleton";
import Button from "src/components/common/Button";
import { useAppSelector } from "src/app/store";

type AnimeListProps = {
  data: Anime[];
  status: InitialAnimeState["status"];
  layout?: "column";
  listType?: "anime_list" | "collection_list" | "contribution_list";
};

const AnimeList = ({ data, status, layout, listType }: AnimeListProps) => {
  const cardSkeletonList = [1, 2, 3, 4, 5];

  const { user } = useAppSelector((state) => state.user);

  switch (layout) {
    case "column":
      return (
        <div>
          {status === "loading" ||
          (listType === "contribution_list" && status === "loading_delete") ? (
            <div className="w-full">
              <CardSkeleton type="column" />
            </div>
          ) : data?.length === 0 ? (
            <div
              className={`relative z-0 h-[320px] overflow-hidden  rounded-2xl bg-slate-800 `}
            >
              <div className=" absolute -z-10 h-full w-full bg-gradient-to-tr from-slate-900/70 to-sky-700/25" />
              <img
                src="/images/notfound.jpeg"
                alt="not_found"
                className="absolute left-0 top-0 -z-20 h-full w-full object-cover"
              />
              <div className="flex h-full flex-col items-center justify-center">
                {listType === "collection_list" ? (
                  <>
                    <Text
                      as="h2"
                      className=" mb-5 w-full text-center font-title"
                    >
                      No Collection.
                    </Text>
                    <Button
                      className="btn btn-primary"
                      as="link"
                      to={"/categories"}
                    >
                      Find Your Favorite Animes
                    </Button>
                  </>
                ) : listType === "contribution_list" ? (
                  <>
                    <Text
                      as="h2"
                      className=" mb-5 w-full text-center font-title"
                    >
                      No Contribution
                    </Text>
                    <Button
                      className="btn btn-primary"
                      as="link"
                      to={user ? "/create-anime" : "/login"}
                    >
                      Make Contribution?
                    </Button>
                  </>
                ) : (
                  <Text as="h2" className=" mb-5 w-full text-center font-title">
                    No Animes Be Found
                  </Text>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              {data &&
                data.map((anime) =>
                  listType === "contribution_list" ? (
                    <Card
                      key={anime.id}
                      cardType="column"
                      id={anime.id}
                      slug={anime.slug}
                      title={anime.title}
                      releaseYear={anime.releaseYear}
                      coverImage={anime.coverImage}
                      likes={anime.likes}
                      hasButton={true}
                    />
                  ) : (
                    <Card
                      key={anime.id}
                      cardType="column"
                      id={anime.id}
                      slug={anime.slug}
                      title={anime.title}
                      releaseYear={anime.releaseYear}
                      coverImage={anime.coverImage}
                      likes={anime.likes}
                    />
                  )
                )}
            </div>
          )}
        </div>
      );

    default:
      return (
        <div>
          {status === "loading" ? (
            <div className="grid grid-cols-1 justify-items-center gap-12 md:grid-cols-3  lg:grid-cols-5">
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
            <div className="grid grid-cols-1 justify-items-center gap-12 md:grid-cols-3 lg:grid-cols-5 ">
              {data.map((anime) => (
                <Card
                  key={anime.id}
                  id={anime.id}
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
