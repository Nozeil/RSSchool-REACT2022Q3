import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'api/api';
import { setIsLoading, updateHomePageDataAfterLoad } from 'redux/appSlice';
import { RootState } from 'redux/types';
import getPagesSize from 'utils/getPagesSize';
import getPaginatedInterestingnessData from 'utils/getPaginatedInterestingnessData';
import getSortedInterestingnessData from 'utils/getSortedInterestingnessData';

const updateStateAfterLoad = createAsyncThunk<void, void, { state: RootState }>(
  'app/updateStateAfterLoad',
  async (_, { getState, dispatch }) => {
    try {
      const { homeCards, homeCardsSort, resultsPerPage, pagesMaxSize, page } = getState();
      dispatch(setIsLoading(true));
      if (!homeCards.length) {
        const { data } = await API.getData();
        const cards = getSortedInterestingnessData(data, homeCardsSort);
        const paginatedCards = getPaginatedInterestingnessData(cards, resultsPerPage);

        dispatch(
          updateHomePageDataAfterLoad({
            homeCards: paginatedCards[page - 1],
            paginatedHomeCards: paginatedCards,
            pages: getPagesSize(pagesMaxSize, paginatedCards.length),
          })
        );
      }
      dispatch(setIsLoading(false));
    } catch (e) {
      console.error(e);
    }
  }
);

export default updateStateAfterLoad;
