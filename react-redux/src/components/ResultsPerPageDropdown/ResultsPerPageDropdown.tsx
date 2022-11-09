import { ResultsPerPageDropdownValues } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { ChangeEvent } from 'react';
import { updateHomePageDataAfterPerPageValueChanged } from 'redux/appSlice';
import getPhotos from 'redux/thunks/getPhotos';
import getPagesSize from 'utils/getPagesSize';
import getPaginatedInterestingnessData from 'utils/getPaginatedInterestingnessData';
import cl from './../../pages/Home/Home.module.css';

const ResultsPerPageDropdown = () => {
  const dispatch = useAppDispatch();
  const {
    resultsPerPage,
    isLoading,
    isItInitialPage,
    paginatedHomeCards,
    pagesMaxSize,
    lastSearch,
    homeCardsSort,
  } = useAppSelector((state) => state);

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const resultsPerPage = +e.target.value;
    const startPage = 1;

    if (isItInitialPage) {
      const cards = paginatedHomeCards.flat(1);
      const paginatedCards = getPaginatedInterestingnessData(cards, resultsPerPage);

      dispatch(
        updateHomePageDataAfterPerPageValueChanged({
          homeCards: paginatedCards[startPage - 1],
          paginatedHomeCards: paginatedCards,
          page: startPage,
          pages: getPagesSize(pagesMaxSize, paginatedCards.length),
          resultsPerPage,
        })
      );
    } else {
      const response = await dispatch(
        getPhotos({
          tags: lastSearch,
          page: startPage,
          perPage: resultsPerPage,
          sort: homeCardsSort,
        })
      ).unwrap();
      if (response) {
        const { data: homeCards, pages } = response;
        dispatch(
          updateHomePageDataAfterPerPageValueChanged({
            homeCards,
            resultsPerPage,
            page: startPage,
            pages: getPagesSize(pagesMaxSize, pages),
          })
        );
      }
    }
  };

  const ResultsPerPageClass = isLoading ? `${cl.disabled} ${cl.field}` : cl.field;

  return (
    <select defaultValue={resultsPerPage} className={ResultsPerPageClass} onChange={onChange}>
      <option value={ResultsPerPageDropdownValues.ten}>10 cards per page</option>
      <option value={ResultsPerPageDropdownValues.twenty}>20 cards per page</option>
      <option value={ResultsPerPageDropdownValues.thirty}>30 cards per page</option>
      <option value={ResultsPerPageDropdownValues.fifty}>50 cards per page</option>
      <option value={ResultsPerPageDropdownValues.oneHundred}>100 cards per page</option>
    </select>
  );
};

export default ResultsPerPageDropdown;
