import { SortDropdownValues } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { ChangeEvent } from 'react';
import { updateHomePageDataAfterSortValueChanged } from 'redux/appSlice';
import getPhotos from 'redux/thunks/getPhotos';
import getPaginatedInterestingnessData from 'utils/getPaginatedInterestingnessData';
import getSortedInterestingnessData from 'utils/getSortedInterestingnessData';
import cl from './../../pages/Home/Home.module.css';

const SortDropdown = () => {
  const dispatch = useAppDispatch();
  const {
    homeCardsSort,
    isLoading,
    isItInitialPage,
    paginatedHomeCards,
    resultsPerPage,
    page,
    lastSearch,
  } = useAppSelector((state) => state);

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;

    if (isItInitialPage) {
      const cards = paginatedHomeCards.flat(1);
      const sortedCards = getSortedInterestingnessData(cards, sort);
      const paginatedCards = getPaginatedInterestingnessData(sortedCards, resultsPerPage);

      dispatch(
        updateHomePageDataAfterSortValueChanged({
          homeCards: paginatedCards[page - 1],
          paginatedHomeCards: paginatedCards,
          homeCardsSort: sort,
        })
      );
    } else {
      const response = await dispatch(
        getPhotos({
          tags: lastSearch,
          page,
          perPage: resultsPerPage,
          sort,
        })
      ).unwrap();

      if (response) {
        const { data: homeCards } = response;
        dispatch(
          updateHomePageDataAfterSortValueChanged({
            homeCards,
            homeCardsSort: sort,
          })
        );
      }
    }
  };

  const sortClass = isLoading ? `${cl.disabled} ${cl.field}` : cl.field;

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
