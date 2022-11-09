import CardList from 'components/CardList/CardList';
import SearchBar from 'components/SearchBar/SearchBar';
import React, { ChangeEvent, useEffect, useState } from 'react';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import cl from './Home.module.css';
import ResultsPerPageDropdown from 'components/ResultsPerPageDropdown/ResultsPerPageDropdown';
import SortDropdown from 'components/SortDropdown/SortDropdown';
import { Pagination } from '@mui/material';
import TotalPagesDropdown from 'components/TotalPagesDropdown/TotalPagesDropdown';
import { RootState } from 'redux/types';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'hooks/hooks';
import { updateHomePageDataAfterLoad, updateHomePageDataAfterPagination } from 'redux/appSlice';
import getSortedInterestingnessData from 'utils/getSortedInterestingnessData';
import getPaginatedInterestingnessData from 'utils/getPaginatedInterestingnessData';
import getPagesSize from 'utils/getPagesSize';
import getInterestingness from 'redux/thunks/getInterestingness';
import getPhotos from 'redux/thunks/getPhotos';

const Home = () => {
  const dispatch = useAppDispatch();
  const {
    page: currPage,
    pages,
    isLoading,
    homeCardsSort,
    resultsPerPage,
    pagesMaxSize,
    homeCards,
    isItInitialPage,
    paginatedHomeCards,
    lastSearch,
  } = useSelector((state: RootState) => state);

  const [searchValue, setSearchValue] = useState<string>('');

  const updateStateAfterLoad = async () => {
    if (!homeCards.length) {
      const cards = await dispatch(getInterestingness()).unwrap();

      if (cards) {
        const sortedCards = getSortedInterestingnessData(cards, homeCardsSort);
        const paginatedCards = getPaginatedInterestingnessData(sortedCards, resultsPerPage);

        dispatch(
          updateHomePageDataAfterLoad({
            homeCards: paginatedCards[currPage - 1],
            paginatedHomeCards: paginatedCards,
            pages: getPagesSize(pagesMaxSize, paginatedCards.length),
          })
        );
      }
    }
  };

  useEffect(() => {
    updateStateAfterLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const content = isLoading ? <LoadingSpinner /> : <CardList />;

  const onChange = async (_: ChangeEvent<unknown>, page: number) => {
    if (page !== currPage) {
      if (isItInitialPage) {
        dispatch(
          updateHomePageDataAfterPagination({
            homeCards: paginatedHomeCards[page - 1],
            page,
          })
        );
      } else {
        const response = await dispatch(
          getPhotos({
            tags: lastSearch,
            sort: homeCardsSort,
            page,
            perPage: resultsPerPage,
          })
        ).unwrap();
        if (response) {
          const { data: homeCards } = response;
          dispatch(
            updateHomePageDataAfterPagination({
              homeCards,
              page,
            })
          );
        }
      }
    }
  };

  return (
    <>
      <div className={cl.controls}>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        <SortDropdown />
        <ResultsPerPageDropdown />
        <TotalPagesDropdown />
      </div>
      <Pagination count={pages} page={currPage} onChange={onChange} disabled={isLoading} />
      {content}
    </>
  );
};

export default Home;
