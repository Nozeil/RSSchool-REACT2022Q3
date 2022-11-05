import { AppProviderArgsI, AppActionType, InitialStateI, FormFieldsI } from 'App.types';
import { appReducer } from 'AppReducer';
import { Countries } from 'components/Form/Form.enums';
import { ResultsPerPageDropdownValues, SortDropdownValues, TotalPagesDropdownValues } from 'enums';
import React, { createContext, useContext, useReducer } from 'react';

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

const AppContext = createContext<{
  appState: InitialStateI;
  dispatch: React.Dispatch<AppActionType>;
}>({ appState: initialState, dispatch: () => null });

export const AppProvider = ({ children }: AppProviderArgsI) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = {
    appState: state,
    dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used with AppContext');
  }

  return context;
};

export default useAppContext;
