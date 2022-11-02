import { AppActionType, InitialStateI } from 'App.types';
import { AppActions } from 'enums';

export const appReducer = (state: InitialStateI, action: AppActionType) => {
  const { type, payload } = action;

  switch (type) {
    case AppActions.addFormCard:
      return {
        ...state,
        formCards: [...state.formCards, payload.formCard],
      };
    case AppActions.addHomeCards:
      return {
        ...state,
        homeCards: payload.homeCards,
        paginatedHomeCards: payload.paginatedHomeCards,
        homeCardsSort: payload.homeCardsSort,
        resultsPerPage: payload.resultsPerPage,
        page: payload.page,
        pages: payload.pages,
        pagesMaxSize: payload.pagesMaxSize,
        isItInitialPage: payload.isItInitialPage,
      };
    default:
      return state;
  }
};
