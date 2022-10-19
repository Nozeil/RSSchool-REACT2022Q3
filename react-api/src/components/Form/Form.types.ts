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
