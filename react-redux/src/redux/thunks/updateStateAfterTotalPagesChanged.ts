import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'api/api';
import { ChangeEvent } from 'react';
import { updateHomePageDataAfterTotalPagesValueChanged, setIsLoading } from 'redux/appSlice';
import { RootState } from 'redux/types';
import getPagesSize from 'utils/getPagesSize';

const updateStateAfterTotalPagesChanged = createAsyncThunk<
  void,
  ChangeEvent<HTMLSelectElement>,
  { state: RootState }
>('app/updateStateAfterTotalPagesChanged', async (e, { getState, dispatch }) => {
  const pagesMaxSize = +e.target.value;
  const { isItInitialPage, paginatedHomeCards, lastSearch, resultsPerPage, homeCardsSort } =
    getState();
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
    try {
      dispatch(setIsLoading(true));
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
      dispatch(setIsLoading(false));
    } catch (e) {
      console.error(e);
    }
  }
});

export default updateStateAfterTotalPagesChanged;
