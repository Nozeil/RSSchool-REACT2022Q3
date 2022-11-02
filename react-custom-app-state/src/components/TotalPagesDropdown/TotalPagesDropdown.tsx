import API from 'api/api';
import useAppContext from 'AppContext';
import { AppActions, TotalPagesDropdownValues } from 'enums';
import { HomeControlI } from 'pages/Home/Home.interfaces';
import React, { ChangeEvent } from 'react';
import cl from './../../pages/Home/Home.module.css';

const TotalPagesDropdown = ({ homeState, setIsLoading, getPagesSize }: HomeControlI) => {
  const { appState, dispatch } = useAppContext();
  const { isItInitialPage, paginatedHomeCards, resultsPerPage, homeCardsSort, pagesMaxSize } =
    appState;
  const { lastSearch } = homeState;
  const startPage = 1;

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const pagesMaxSize = +e.target.value;

    if (isItInitialPage) {
      dispatch({
        type: AppActions.addHomeCards,
        payload: {
          ...appState,
          page: startPage,
          pages: getPagesSize(pagesMaxSize, paginatedHomeCards.length),
          pagesMaxSize,
          homeCards: paginatedHomeCards[startPage - 1],
        },
      });
    } else {
      try {
        setIsLoading(true);
        const { data: homeCards, pages } = await API.getData({
          tags: lastSearch,
          page: startPage,
          perPage: resultsPerPage,
          sort: homeCardsSort,
        });
        dispatch({
          type: AppActions.addHomeCards,
          payload: {
            ...appState,
            homeCards,
            resultsPerPage,
            page: startPage,
            pages: getPagesSize(pagesMaxSize, pages),
            pagesMaxSize,
          },
        });
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const TotalPagesClass = homeState.isLoading ? `${cl.disabled} ${cl.field}` : cl.field;

  return (
    <select className={TotalPagesClass} defaultValue={pagesMaxSize} onChange={onChange}>
      <option value={TotalPagesDropdownValues.ten}>10 pages</option>
      <option value={TotalPagesDropdownValues.twentyFive}>25 pages</option>
      <option value={TotalPagesDropdownValues.fifty}>50 pages</option>
    </select>
  );
};

export default TotalPagesDropdown;
