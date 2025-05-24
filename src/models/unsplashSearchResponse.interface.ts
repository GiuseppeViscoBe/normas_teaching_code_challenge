import { searchResponseFiltered } from "./searchResponseFiltered.interface";

export interface UnsplashSearchResponse {
    total: number;
    total_pages: number;
    results: searchResponseFiltered[];
  }