import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'api/api';
import { setIsLoading, setLastSearch, updateHomePageDataAfterSearch } from 'redux/appSlice';
import { RootState } from 'redux/types';
import getPagesSize from 'utils/getPagesSize';
import { KeyboardEvent } from 'react';

export const updateStateAfterSearch = createAsyncThunk<
  void,
  KeyboardEvent<HTMLInputElement>,
  { state: RootState }
>('app/updateStateAfterSearch', async (e, { getState, dispatch }) => {
  const tags = e.currentTarget.value;
  const { homeCardsSort, resultsPerPage, pagesMaxSize } = getState();
  const startPage = 1;

  if (e.code === 'Enter' && tags) {
    try {
      e.currentTarget.blur();
      dispatch(setLastSearch({ lastSearch: tags }));
      dispatch(setIsLoading(true));
      const { data: homeCards, pages } = await API.getData({
        tags,
        sort: homeCardsSort,
        page: startPage,
        perPage: resultsPerPage,
      });
      dispatch(
        updateHomePageDataAfterSearch({
          homeCards,
          page: startPage,
          pages: getPagesSize(pagesMaxSize, pages),
          isItInitialPage: false,
        })
      );
      dispatch(setIsLoading(false));
    } catch (e) {
      console.error(e);
    }
  }
});

export default updateStateAfterSearch;
