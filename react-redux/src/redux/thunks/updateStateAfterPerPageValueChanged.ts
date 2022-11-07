import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'api/api';
import { ChangeEvent } from 'react';
import { updateHomePageDataAfterPerPageValueChanged, setIsLoading } from 'redux/appSlice';
import { RootState } from 'redux/types';
import getPagesSize from 'utils/getPagesSize';
import getPaginatedInterestingnessData from 'utils/getPaginatedInterestingnessData';

const updateStateAfterPerPageValueChanged = createAsyncThunk<
  void,
  ChangeEvent<HTMLSelectElement>,
  { state: RootState }
>('app/updateStateAfterPerPageValueChanged', async (e, { getState, dispatch }) => {
  const resultsPerPage = +e.target.value;
  const startPage = 1;
  const { isItInitialPage, paginatedHomeCards, pagesMaxSize, lastSearch, homeCardsSort } =
    getState();

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
      dispatch(setIsLoading(true));
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
      dispatch(setIsLoading(false));
    } catch (e) {
      console.error(e);
    }
  }
});

export default updateStateAfterPerPageValueChanged;
