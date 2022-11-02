import { PhotosInfoPhotoI } from 'api/api.interfaces';

export interface HomeStateI {
  searchValue: string;
  lastSearch: string;
  isLoading: boolean;
}

export interface HomeControlI {
  homeState: HomeStateI;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  getSortedInterestingnessData: (
    homeCards: PhotosInfoPhotoI[],
    sortValue: string
  ) => PhotosInfoPhotoI[];

  getPaginatedInterestingnessData: (
    homeCards: PhotosInfoPhotoI[],
    resultsPerPage: number
  ) => PhotosInfoPhotoI[][];

  getPagesSize: (pagesMaxSize: number, cardsSize: number) => number;
}
