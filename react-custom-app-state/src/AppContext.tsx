import { AppProviderArgsI, AppActionType, InitialStateI } from 'App.types';
import { appReducer } from 'AppReducer';
import { ResultsPerPageDropdownValues, SortDropdownValues, TotalPagesDropdownValues } from 'enums';
import React, { createContext, useContext, useReducer } from 'react';

const initialState: InitialStateI = {
  formCards: [],
  homeCards: [],
  paginatedHomeCards: [],
  homeCardsSort: SortDropdownValues.viewsDesc,
  resultsPerPage: ResultsPerPageDropdownValues.ten,
  page: 1,
  pages: 1,
  pagesMaxSize: TotalPagesDropdownValues.fifty,
  isItInitialPage: true,
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
