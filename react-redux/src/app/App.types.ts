import { PhotosInfoPhotoI, TagI } from 'api/api.interfaces';
import { SortDropdownValues } from 'enums';
import React from 'react';

export interface FormCardDataI {
  name: string;
  surname: string;
  date: string;
  country: string;
  gender: string;
  file: string;
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

export interface AppProviderArgsI {
  children: React.ReactElement;
}

export interface FormFieldsI {
  [k: string]: { value: string | boolean | FileList; invalid: boolean };
}
