import API from 'api/api';
import { TotalPagesDropdownValues } from 'enums';
import { HomeControlI } from 'pages/Home/Home.interfaces';
import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHomePageDataAfterTotalPagesValueChanged } from 'redux/appSlice';
import { RootState } from 'redux/types';
import cl from './../../pages/Home/Home.module.css';

const TotalPagesDropdown = ({ homeState, setIsLoading, getPagesSize }: HomeControlI) => {
  const dispatch = useDispatch();
  const {
    isItInitialPage,
    paginatedHomeCards,
    resultsPerPage,
    homeCardsSort,
    pagesMaxSize,
    lastSearch,
  } = useSelector((state: RootState) => state);
  const startPage = 1;

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const pagesMaxSize = +e.target.value;

    if (isItInitialPage) {
      dispatch(
        updateHomePageDataAfterTotalPagesValueChanged({
          homeCards: paginatedHomeCards[startPage - 1],
          page: startPage,
          pages: getPagesSize(pagesMaxSize, paginatedHomeCards.length),
          pagesMaxSize,
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
          updateHomePageDataAfterTotalPagesValueChanged({
            homeCards,
            resultsPerPage,
            page: startPage,
            pages: getPagesSize(pagesMaxSize, pages),
            pagesMaxSize,
          })
        );
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
