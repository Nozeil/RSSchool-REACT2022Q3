import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'api/api';
import { ChangeEvent } from 'react';
import { updateHomePageDataAfterSortValueChanged, setIsLoading } from 'redux/appSlice';
import { RootState } from 'redux/types';
import getPaginatedInterestingnessData from 'utils/getPaginatedInterestingnessData';
import getSortedInterestingnessData from 'utils/getSortedInterestingnessData';

const updateStateAfterSortChanged = createAsyncThunk<
  void,
  ChangeEvent<HTMLSelectElement>,
  { state: RootState }
>('app/updateStateAfterSortChanged', async (e, { getState, dispatch }) => {
  const sort = e.target.value;
  const { isItInitialPage, paginatedHomeCards, resultsPerPage, page, lastSearch } = getState();

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
      dispatch(setIsLoading(true));
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
      dispatch(setIsLoading(false));
    } catch (e) {
      console.error(e);
    }
  }
});

export default updateStateAfterSortChanged;
