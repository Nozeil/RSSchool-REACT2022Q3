import { PhotosInfoPhotoI } from 'api/api.interfaces';
import { AppActions, SortDropdownValues } from 'enums';
import React from 'react';

export interface FormCardDataI {
  name: string;
  surname: string;
  date: string;
  country: string;
  gender: string;
  file: File;
}

export interface FormCardI {
  data: FormCardDataI;
  id: number;
}

export type FormCardsData = FormCardI[];

export type HomeCardsSortType =
  | SortDropdownValues.dateAsc
  | SortDropdownValues.dateDesc
  | SortDropdownValues.viewsAsc
  | SortDropdownValues.viewsDesc;

export interface InitialStateI {
  formCards: FormCardsData;
  homeCards: PhotosInfoPhotoI[];
  paginatedHomeCards: PhotosInfoPhotoI[][];
  homeCardsSort: string;
  resultsPerPage: number;
  page: number;
  pages: number;
  pagesMaxSize: number;
  isItInitialPage: boolean;
}

export interface HomeActionI {
  type: AppActions.addHomeCards;
  payload: {
    homeCards: PhotosInfoPhotoI[];
    paginatedHomeCards: PhotosInfoPhotoI[][];
    homeCardsSort: string;
    resultsPerPage: number;
    page: number;
    pages: number;
    pagesMaxSize: number;
    isItInitialPage: boolean;
  };
}
export interface FormActionI {
  type: AppActions.addFormCard;
  payload: {
    formCard: FormCardI;
  };
}

export type AppActionType = HomeActionI | FormActionI;

export interface AppProviderArgsI {
  children: React.ReactElement;
}
