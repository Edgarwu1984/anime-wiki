export interface Anime {
  id: string;
  slug: string;
  title: string;
  category: "80s" | "90s" | "uncategoried";
  genre: "Sci-Fi" | "Action" | "unknown";
  region: "Japan" | "US" | "unknown";
  directedBy: string;
  releaseYear: string;
  description: string;
  coverImage: string;
  bannerImage: string;
  featureImage: string;
  galleries: string[];
  likes: number;
  contributedBy: string;
}

export interface InitialAnimeState {
  animes: Anime[];
  anime: Anime;
  status: "loading" | "success" | "error" | "idle";
  message: string;
}
