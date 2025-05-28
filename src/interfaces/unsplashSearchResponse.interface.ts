import { searchResponseFiltered } from "./searchResponseFiltered.interface";


export interface UnsplashSearchResponseItem {
  id: string;
  width: number;
  height: number;
  description?: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
}

export interface UnsplashSearchResponse {
    total: number;
    total_pages: number;
    results: UnsplashSearchResponseItem[];
  }