import { PhotosInfoPhotoI, TagI } from 'api/api.interfaces';
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

export interface CardPageDataI {
  description: string;
  tags: TagI[];
  src: string;
  title: string;
  subtitle: string;
  id: string;
}
export interface InitialStateI {
  formCards: FormCardsData;
  formValues: FormFieldsI;
  homeCards: PhotosInfoPhotoI[];
  paginatedHomeCards: PhotosInfoPhotoI[][];
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

export interface FormAddCardActionI {
  type: AppActions.addFormCard;
  payload: {
    formCard: FormCardI;
  };
}

export interface FormSaveDataActionI {
  type: AppActions.saveFormData;
  payload: {
    formValues: FormFieldsI;
  };
}

export interface FormSetIsDirtyActionI {
  type: AppActions.setIsDirty;
  payload: {
    isDirty: boolean;
  };
}

export interface FormSetShouldShowErrors {
  type: AppActions.setShouldShowErrors;
  payload: {
    shouldShowErrors: boolean;
  };
}

export interface SetCardPageDataActionI {
  type: AppActions.setCardPageData;
  payload: {
    cardPageData: CardPageDataI;
  };
}

export type AppActionType =
  | HomeActionI
  | FormAddCardActionI
  | FormSaveDataActionI
  | FormSetIsDirtyActionI
  | FormSetShouldShowErrors
  | SetCardPageDataActionI;

export interface AppProviderArgsI {
  children: React.ReactElement;
}

export interface FormFieldsI {
  [k: string]: { value: string | boolean | FileList; invalid: boolean };
}
