import API from 'api/api';
import { ResultsPerPageDropdownValues } from 'enums';
import { HomeControlI } from 'pages/Home/Home.interfaces';
import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHomePageDataAfterPerPageValueChanged } from 'redux/appSlice';
import { RootState } from 'redux/types';
import cl from './../../pages/Home/Home.module.css';

const ResultsPerPageDropdown = ({
  homeState,
  setIsLoading,
  getPaginatedInterestingnessData,
  getPagesSize,
}: HomeControlI) => {
  const dispatch = useDispatch();
  const {
    isItInitialPage,
    homeCardsSort,
    paginatedHomeCards,
    pagesMaxSize,
    lastSearch,
    resultsPerPage,
  } = useSelector((state: RootState) => state);
  const startPage = 1;

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const resultsPerPage = +e.target.value;

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
      try {
        setIsLoading(true);
        const { data: homeCards, pages } = await API.getData({
          tags: lastSearch,
          page: startPage,
          perPage: resultsPerPage,
          sort: homeCardsSort,
        });
        dispatch(
          updateHomePageDataAfterPerPageValueChanged({
            homeCards,
            resultsPerPage,
            page: startPage,
            pages: getPagesSize(pagesMaxSize, pages),
          })
        );
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const ResultsPerPageClass = homeState.isLoading ? `${cl.disabled} ${cl.field}` : cl.field;

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
