import API from 'api/api';
import { SortDropdownValues } from 'enums';
import { HomeControlI } from 'pages/Home/Home.interfaces';
import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHomePageDataAfterSortValueChanged } from 'redux/appSlice';
import { RootState } from 'redux/types';
import cl from './../../pages/Home/Home.module.css';

const SortDropdown = ({
  setIsLoading,
  homeState,
  getSortedInterestingnessData,
  getPaginatedInterestingnessData,
}: HomeControlI) => {
  const dispatch = useDispatch();
  const { paginatedHomeCards, resultsPerPage, page, isItInitialPage, lastSearch, homeCardsSort } =
    useSelector((state: RootState) => state);

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;

    if (isItInitialPage) {
      const cards = paginatedHomeCards.flat(1);
      const sortedCards = getSortedInterestingnessData(cards, e.target.value);
      const paginatedCards = getPaginatedInterestingnessData(sortedCards, resultsPerPage);

      dispatch(
        updateHomePageDataAfterSortValueChanged({
          homeCards: paginatedCards[page - 1],
          paginatedHomeCards: paginatedCards,
          homeCardsSort: sort,
        })
      );
    } else {
      try {
        setIsLoading(true);
        const { data: homeCards } = await API.getData({
          tags: lastSearch,
          page,
          perPage: resultsPerPage,
          sort,
        });
        dispatch(
          updateHomePageDataAfterSortValueChanged({
            homeCards,
            homeCardsSort: sort,
          })
        );
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const sortClass = homeState.isLoading ? `${cl.disabled} ${cl.field}` : cl.field;

  return (
    <select onChange={onChange} defaultValue={homeCardsSort} className={sortClass}>
      <option value={SortDropdownValues.viewsDesc}>Views &darr;</option>
      <option value={SortDropdownValues.viewsAsc}>Views &uarr;</option>
      <option value={SortDropdownValues.dateDesc}>Date &darr;</option>
      <option value={SortDropdownValues.dateAsc}>Date &uarr;</option>
    </select>
  );
};

export default SortDropdown;
