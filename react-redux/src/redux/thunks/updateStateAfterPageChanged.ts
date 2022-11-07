import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'api/api';
import { updateHomePageDataAfterPagination, setIsLoading } from 'redux/appSlice';
import { RootState } from 'redux/types';

const updateStateAfterPageChanged = createAsyncThunk<void, number, { state: RootState }>(
  'app/updateStateAfterPageChanged',
  async (page, { getState, dispatch }) => {
    const {
      page: currPage,
      isItInitialPage,
      paginatedHomeCards,
      lastSearch,
      homeCardsSort,
      resultsPerPage,
    } = getState();
    if (page !== currPage) {
      if (isItInitialPage) {
        dispatch(
          updateHomePageDataAfterPagination({
            homeCards: paginatedHomeCards[page - 1],
            page,
          })
        );
      } else {
        try {
          dispatch(setIsLoading(true));
          const { data: homeCards } = await API.getData({
            tags: lastSearch,
            sort: homeCardsSort,
            page,
            perPage: resultsPerPage,
          });
          dispatch(
            updateHomePageDataAfterPagination({
              homeCards,
              page,
            })
          );
          dispatch(setIsLoading(false));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
);

export default updateStateAfterPageChanged;
