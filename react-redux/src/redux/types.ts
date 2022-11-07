import { PhotosInfoPhotoI } from 'api/api.interfaces';
import { FormCardsData, FormFieldsI, CardPageDataI } from 'app/App.types';
import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface InitialStateI {
  isLoading: boolean;
  formCards: FormCardsData;
  formValues: FormFieldsI;
  homeCards: PhotosInfoPhotoI[];
  paginatedHomeCards: PhotosInfoPhotoI[][];
  lastSearch: string;
  homeCardsSort: string;
  resultsPerPage: number;
  page: number;
  pages: number;
  pagesMaxSize: number;
  isItInitialPage: boolean;
  isDirty: boolean;
  shouldShowErrors: boolean;
  cardPageData: CardPageDataI;
}

export interface HomePageDataPayloadAfterLoadActionI {
  homeCards: PhotosInfoPhotoI[];
  paginatedHomeCards: PhotosInfoPhotoI[][];
  pages: number;
}

export interface HomePageDataAfterPaginationOnChangeI {
  homeCards: PhotosInfoPhotoI[];
  page: number;
}

export interface HomePageDataAfterPerPageValueChangedI {
  homeCards: PhotosInfoPhotoI[];
  paginatedHomeCards?: PhotosInfoPhotoI[][];
  page: number;
  pages: number;
  resultsPerPage: number;
}

export interface HomePageDataAfterSortValueChangedI {
  homeCards: PhotosInfoPhotoI[];
  paginatedHomeCards?: PhotosInfoPhotoI[][];
  homeCardsSort: string;
}

export interface HomePageDataAfterSearchI {
  homeCards: PhotosInfoPhotoI[];
  page: number;
  pages: number;
  isItInitialPage: boolean;
}

export interface HomePageDataAfterTotalPagesValueChangedI {
  homeCards: PhotosInfoPhotoI[];
  resultsPerPage?: number;
  page: number;
  pages: number;
  pagesMaxSize: number;
}
