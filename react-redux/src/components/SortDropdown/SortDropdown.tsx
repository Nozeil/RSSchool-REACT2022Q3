import API from 'api/api';
import useAppContext from 'AppContext';
import { AppActions, SortDropdownValues } from 'enums';
import { HomeControlI } from 'pages/Home/Home.interfaces';
import React, { ChangeEvent } from 'react';
import cl from './../../pages/Home/Home.module.css';

const SortDropdown = ({
  setIsLoading,
  homeState,
  getSortedInterestingnessData,
  getPaginatedInterestingnessData,
}: HomeControlI) => {
  const { appState, dispatch } = useAppContext();
  const { paginatedHomeCards, resultsPerPage, page, isItInitialPage, lastSearch } = appState;

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;

    if (isItInitialPage) {
      const cards = paginatedHomeCards.flat(1);
      const sortedCards = getSortedInterestingnessData(cards, e.target.value);
      const paginatedCards = getPaginatedInterestingnessData(sortedCards, resultsPerPage);

      dispatch({
        type: AppActions.addHomeCards,
        payload: {
          ...appState,
          homeCards: paginatedCards[page - 1],
          paginatedHomeCards: paginatedCards,
          homeCardsSort: sort,
        },
      });
    } else {
      try {
        setIsLoading(true);
        const { data: homeCards } = await API.getData({
          tags: lastSearch,
          page,
          perPage: resultsPerPage,
          sort,
        });
        dispatch({
          type: AppActions.addHomeCards,
          payload: {
            ...appState,
            homeCards,
            homeCardsSort: sort,
          },
        });
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const sortClass = homeState.isLoading ? `${cl.disabled} ${cl.field}` : cl.field;

  return (
    <select onChange={onChange} defaultValue={appState.homeCardsSort} className={sortClass}>
      <option value={SortDropdownValues.viewsDesc}>Views &darr;</option>
      <option value={SortDropdownValues.viewsAsc}>Views &uarr;</option>
      <option value={SortDropdownValues.dateDesc}>Date &darr;</option>
      <option value={SortDropdownValues.dateAsc}>Date &uarr;</option>
    </select>
  );
};

export default SortDropdown;
