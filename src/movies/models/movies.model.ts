export interface NowPlaying {
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number,
}

export interface Movie {
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  poster_path: string;
  id: number;
  adult?: boolean;
  backdrop_path: string;
  original_language?: OriginalLanguage;
  original_title?: string;
  genre_ids?: number[];
  title: string;
  vote_average: number;
  overview: string;
  release_date?: string;
  poster_url?: string;
}

export enum OriginalLanguage {
  En = 'en',
  Es = 'es',
  Ko = 'ko',
}
