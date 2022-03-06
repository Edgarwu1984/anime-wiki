import { Link } from "react-router-dom";
// Components
import Text from "src/components/common/Text";
// React Icons
import { FaRegHeart, FaRegClock } from "react-icons/fa";
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
>;

const Card = ({
  id,
  slug,
  title,
  releaseYear,
  coverImage,
  likes,
}: CardProps) => {
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
};

Card.defaultProps = {
  slug: "slug-placeholder",
  title: "anime title",
  releaseYear: "1984",
  coverImage: "/images/image_placeholder.png",
  likes: 0,
};

export default Card;
