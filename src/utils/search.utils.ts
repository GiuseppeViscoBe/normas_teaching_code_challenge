import { searchResponseFiltered } from "../interfaces/searchResponseFiltered.interface";
import { UnsplashSearchResponseItem } from "../interfaces/unsplashSearchResponse.interface";

export const transformToFilteredImage = (item: UnsplashSearchResponseItem): searchResponseFiltered => {
    return {
      imageId: item.id,
      width: item.width,
      height: item.height,
      description: item.description || 'No description available',
      urls: {
        raw: item.urls.raw,
        full: item.urls.full,
        regular: item.urls.regular,
        small: item.urls.small,
        thumb: item.urls.thumb,
        small_s3: item.urls.small_s3,
      }
    };
  }