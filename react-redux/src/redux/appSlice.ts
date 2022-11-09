import { createSlice } from '@reduxjs/toolkit';
import { FormFieldsI } from 'app/App.types';
import { Countries } from 'components/Form/Form.enums';
import { SortDropdownValues, ResultsPerPageDropdownValues, TotalPagesDropdownValues } from 'enums';
import reducers from './reducers';
import getInterestingness from './thunks/getInterestingness';
import getPhotos from './thunks/getPhotos';
import { InitialStateI } from './types';

const defaultFormValues: FormFieldsI = {
  name: { value: '', invalid: false },
  surname: { value: '', invalid: false },
  date: { value: '', invalid: false },
  country: { value: Countries.default, invalid: false },
  consent: { value: '', invalid: false },
  gender: { value: '', invalid: false },
};

const initialState: InitialStateI = {
  isLoading: true,
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
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(getInterestingness.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInterestingness.fulfilled || getPhotos.fulfilled, (state, action) => {
        const { payload } = action;
        if (payload) {
          state.homeCards = payload;
          state.isLoading = false;
        }
      })
      .addCase(getPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPhotos.fulfilled, (state, action) => {
        const { payload } = action;
        if (payload) {
          state.homeCards = payload.data;
          state.isLoading = false;
        }
      });
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
  setIsLoading,
} = appSlice.actions;

export default appSlice.reducer;
