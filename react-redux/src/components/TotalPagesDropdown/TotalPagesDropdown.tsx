import { TotalPagesDropdownValues } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { ChangeEvent } from 'react';
import { updateHomePageDataAfterTotalPagesValueChanged } from 'redux/appSlice';
import getPhotos from 'redux/thunks/getPhotos';
import getPagesSize from 'utils/getPagesSize';
import cl from './../../pages/Home/Home.module.css';

const TotalPagesDropdown = () => {
  const dispatch = useAppDispatch();
  const {
    pagesMaxSize,
    isLoading,
    isItInitialPage,
    paginatedHomeCards,
    lastSearch,
    resultsPerPage,
    homeCardsSort,
  } = useAppSelector((state) => state);

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const pagesMaxSize = +e.target.value;
    const startPage = 1;

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
          updateHomePageDataAfterTotalPagesValueChanged({
            homeCards,
            resultsPerPage,
            page: startPage,
            pages: getPagesSize(pagesMaxSize, pages),
            pagesMaxSize,
          })
        );
      }
    }
  };

  const TotalPagesClass = isLoading ? `${cl.disabled} ${cl.field}` : cl.field;

  return (
    <select className={TotalPagesClass} defaultValue={pagesMaxSize} onChange={onChange}>
      <option value={TotalPagesDropdownValues.ten}>10 pages</option>
      <option value={TotalPagesDropdownValues.twentyFive}>25 pages</option>
      <option value={TotalPagesDropdownValues.fifty}>50 pages</option>
    </select>
  );
};

export default TotalPagesDropdown;
