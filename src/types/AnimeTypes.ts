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
  status:
    | "loading"
    | "success"
    | "error"
    | "idle"
    | "loading_delete"
    | "delete_success"
    | "loading_like"
    | "like_success";
  isLoaded: boolean;
  message: string;
  messageType: "info" | "success" | "error" | "warning";
}
