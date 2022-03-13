import { Link } from "react-router-dom";
// Components
import Text from "src/components/common/Text";
// React Icons
import { FaRegClock } from "react-icons/fa";
// Types
import { Anime } from "src/types/AnimeTypes";

type CardProps = Omit<
  Anime,
  | "category"
  | "genre"
  | "region"
  | "directedBy"
  | "description"
  | "bannerImage"
  | "featureImage"
  | "galleries"
  | "contributedBy"
>;

type ExtraProps = {
  cardType?: "row";
};

type UnionCardProps = CardProps & ExtraProps;

const Card = ({
  id,
  slug,
  title,
  releaseYear,
  coverImage,
  likes,
  cardType,
}: UnionCardProps) => {
  switch (cardType) {
    case "row":
      return (
        <Link
          to={`/categories/${id}`}
          key={id}
          className=" relative h-24 rounded-xl bg-slate-700 bg-gradient-to-r from-slate-900/95 to-sky-700/75 p-4 shadow-md shadow-slate-900 transition hover:brightness-110"
        >
          <div className=" z-20 h-full">
            <div className="mb-2">
              <Text
                as="h5"
                className="card-title font-title text-lg capitalize"
              >
                {title}
              </Text>
            </div>
            <div className="flex items-center space-x-2 text-slate-400">
              <FaRegClock />
              <Text>{releaseYear}</Text>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-[33%] overflow-hidden rounded-xl">
            <div className="absolute h-full w-full bg-gradient-to-r from-sky-900 to-sky-400/40" />
            <img
              className="h-auto w-full object-cover object-center"
              src={`${coverImage}`}
              alt={slug}
            />
          </div>
        </Link>
      );

    default:
      return (
        <Link
          to={`/categories/${id}`}
          key={id}
          className="card flex w-60 flex-col rounded-2xl transition hover:bg-slate-800"
        >
          <div className="card-image-wrap h-[20rem] w-full overflow-hidden rounded-2xl">
            <img
              className="card-image w-full object-cover transition-transform hover:scale-[105%]"
              src={`${coverImage}`}
              alt={slug}
            />
          </div>
          <div className="card-body flex h-fit flex-col justify-between px-2 py-3">
            <div className="h-14">
              <Text as="h5" className="card-title font-title capitalize">
                {title}
              </Text>
            </div>
            <div className="card-details flex justify-between text-slate-400">
              <div className="flex items-center space-x-2">
                <FaRegClock />
                <Text>{releaseYear}</Text>
              </div>
              <div className="flex items-center space-x-2">
                <Text>
                  {likes} {likes > 0 ? "likes" : "like"}
                </Text>
              </div>
            </div>
          </div>
        </Link>
      );
  }
};

Card.defaultProps = {
  slug: "slug-placeholder",
  title: "anime title",
  releaseYear: "1984",
  coverImage: "/images/image_placeholder.png",
  likes: 0,
};

export default Card;
