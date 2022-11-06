import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardPageDataI, FormCardI, FormFieldsI } from 'app/App.types';
import { Countries } from 'components/Form/Form.enums';
import { SortDropdownValues, ResultsPerPageDropdownValues, TotalPagesDropdownValues } from 'enums';
import {
  HomePageDataAfterPaginationOnChangeI,
  HomePageDataAfterPerPageValueChangedI,
  HomePageDataAfterSearchI,
  HomePageDataAfterSortValueChangedI,
  HomePageDataAfterTotalPagesValueChangedI,
  HomePageDataPayloadAfterLoadActionI,
  InitialStateI,
} from './types';

const defaultFormValues: FormFieldsI = {
  name: { value: '', invalid: false },
  surname: { value: '', invalid: false },
  date: { value: '', invalid: false },
  country: { value: Countries.default, invalid: false },
  consent: { value: '', invalid: false },
  gender: { value: '', invalid: false },
};

const initialState: InitialStateI = {
  formCards: [],
  formValues: defaultFormValues,
  homeCards: [],
  paginatedHomeCards: [],
  lastSearch: '',
  homeCardsSort: SortDropdownValues.viewsDesc,
  resultsPerPage: ResultsPerPageDropdownValues.ten,
  page: 1,
  pages: 1,
  pagesMaxSize: TotalPagesDropdownValues.fifty,
  isItInitialPage: true,
  isDirty: false,
  shouldShowErrors: false,
  cardPageData: {
    description: '',
    tags: [],
    src: '',
    title: '',
    subtitle: '',
    id: '',
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addFormCard: (state, action: PayloadAction<{ formCard: FormCardI }>) => {
      state.formCards.push(action.payload.formCard);
    },
    saveFormData: (state, action: PayloadAction<{ formValues: FormFieldsI }>) => {
      state.formValues = action.payload.formValues;
    },
    setIsDirty: (state, action: PayloadAction<{ isDirty: boolean }>) => {
      state.isDirty = action.payload.isDirty;
    },
    setShouldShowErrors: (state, action: PayloadAction<{ shouldShowErrors: boolean }>) => {
      state.shouldShowErrors = action.payload.shouldShowErrors;
    },
    updateHomePageDataAfterLoad: (
      state,
      action: PayloadAction<HomePageDataPayloadAfterLoadActionI>
    ) => {
      Object.assign(state, { ...action.payload });
    },
    updateHomePageDataAfterPagination: (
      state,
      action: PayloadAction<HomePageDataAfterPaginationOnChangeI>
    ) => {
      Object.assign(state, { ...action.payload });
    },
    updateHomePageDataAfterPerPageValueChanged: (
      state,
      action: PayloadAction<HomePageDataAfterPerPageValueChangedI>
    ) => {
      Object.assign(state, { ...action.payload });
    },
    updateHomePageDataAfterSortValueChanged: (
      state,
      action: PayloadAction<HomePageDataAfterSortValueChangedI>
    ) => {
      Object.assign(state, { ...action.payload });
    },
    setLastSearch: (state, action: PayloadAction<{ lastSearch: string }>) => {
      state.lastSearch = action.payload.lastSearch;
    },
    updateHomePageDataAfterSearch: (state, action: PayloadAction<HomePageDataAfterSearchI>) => {
      Object.assign(state, { ...action.payload });
    },
    updateHomePageDataAfterTotalPagesValueChanged: (
      state,
      action: PayloadAction<HomePageDataAfterTotalPagesValueChangedI>
    ) => {
      Object.assign(state, { ...action.payload });
    },
    setCardPageData: (state, action: PayloadAction<{ cardPageData: CardPageDataI }>) => {
      state.cardPageData = action.payload.cardPageData;
    },
  },
});

export const {
  addFormCard,
  saveFormData,
  setIsDirty,
  setShouldShowErrors,
  updateHomePageDataAfterLoad,
  updateHomePageDataAfterPagination,
  updateHomePageDataAfterPerPageValueChanged,
  updateHomePageDataAfterSortValueChanged,
  setLastSearch,
  updateHomePageDataAfterSearch,
  updateHomePageDataAfterTotalPagesValueChanged,
  setCardPageData,
} = appSlice.actions;

export default appSlice.reducer;
