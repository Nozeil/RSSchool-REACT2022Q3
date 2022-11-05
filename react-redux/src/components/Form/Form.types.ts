import { FormCardsData } from 'app/App.types';

export interface FormStateI {
  data: FormCardsData;
  isSuccessMessage: boolean;
  canSubmit: boolean;
  errors: { [k: string]: string };
}

export interface CurrentInputI {
  current: HTMLInputElement | null;
}

export interface CurrentSelectI {
  current: HTMLSelectElement | null;
}

export interface FormValuesI {
  name: string;
  surname: string;
  date: string;
  country: string;
  consent: string | boolean;
  gender: string | boolean;
  image: FileList | '';
}

export type FieldNamesType =
  | 'name'
  | 'surname'
  | 'date'
  | 'country'
  | 'consent'
  | 'gender'
  | 'image';
