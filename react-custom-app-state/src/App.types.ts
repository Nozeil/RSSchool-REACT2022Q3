import { PhotosInfoPhotoI } from 'api/api.interfaces';
import { AppActions } from 'enums';
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

export interface InitialStateI {
  formCards: FormCardsData;
  homeCards: PhotosInfoPhotoI[];
}

export interface HomeActionI {
  type: AppActions.addHomeCards;
  payload: {
    homeCards: PhotosInfoPhotoI[];
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
