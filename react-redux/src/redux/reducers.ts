import { PayloadAction } from '@reduxjs/toolkit';
import { FormCardI, FormFieldsI, CardPageDataI } from 'app/App.types';
import { WritableDraft } from 'immer/dist/internal';
import {
  HomePageDataPayloadAfterLoadActionI,
  HomePageDataAfterPaginationOnChangeI,
  HomePageDataAfterPerPageValueChangedI,
  HomePageDataAfterSortValueChangedI,
  HomePageDataAfterSearchI,
  HomePageDataAfterTotalPagesValueChangedI,
  InitialStateI,
} from './types';

const reducers = {
  addFormCard: (
    state: WritableDraft<InitialStateI>,
    action: PayloadAction<{ formCard: FormCardI }>
  ) => {
    state.formCards.push(action.payload.formCard);
  },
  saveFormData: (
    state: WritableDraft<InitialStateI>,
    action: PayloadAction<{ formValues: FormFieldsI }>
  ) => {
    state.formValues = action.payload.formValues;
  },
  setIsDirty: (
    state: WritableDraft<InitialStateI>,
    action: PayloadAction<{ isDirty: boolean }>
  ) => {
    state.isDirty = action.payload.isDirty;
  },
  setShouldShowErrors: (
    state: WritableDraft<InitialStateI>,
    action: PayloadAction<{ shouldShowErrors: boolean }>
  ) => {
    state.shouldShowErrors = action.payload.shouldShowErrors;
  },
  updateHomePageDataAfterLoad: (
    state: WritableDraft<InitialStateI>,
    action: PayloadAction<HomePageDataPayloadAfterLoadActionI>
  ) => {
    Object.assign(state, { ...action.payload });
  },
  updateHomePageDataAfterPagination: (
    state: WritableDraft<InitialStateI>,
    action: PayloadAction<HomePageDataAfterPaginationOnChangeI>
  ) => {
    Object.assign(state, { ...action.payload });
  },
  updateHomePageDataAfterPerPageValueChanged: (
    state: WritableDraft<InitialStateI>,
    action: PayloadAction<HomePageDataAfterPerPageValueChangedI>
  ) => {
    Object.assign(state, { ...action.payload });
  },
  updateHomePageDataAfterSortValueChanged: (
    state: WritableDraft<InitialStateI>,
    action: PayloadAction<HomePageDataAfterSortValueChangedI>
  ) => {
    Object.assign(state, { ...action.payload });
  },
  setLastSearch: (
    state: WritableDraft<InitialStateI>,
    action: PayloadAction<{ lastSearch: string }>
  ) => {
    state.lastSearch = action.payload.lastSearch;
  },
  updateHomePageDataAfterSearch: (
    state: WritableDraft<InitialStateI>,
    action: PayloadAction<HomePageDataAfterSearchI>
  ) => {
    Object.assign(state, { ...action.payload });
  },
  updateHomePageDataAfterTotalPagesValueChanged: (
    state: WritableDraft<InitialStateI>,
    action: PayloadAction<HomePageDataAfterTotalPagesValueChangedI>
  ) => {
    Object.assign(state, { ...action.payload });
  },
  setCardPageData: (
    state: WritableDraft<InitialStateI>,
    action: PayloadAction<{ cardPageData: CardPageDataI }>
  ) => {
    state.cardPageData = action.payload.cardPageData;
  },
  setIsLoading: (state: WritableDraft<InitialStateI>, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },
};

export default reducers;
