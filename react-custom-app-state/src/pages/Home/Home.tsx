import CardList from 'components/CardList/CardList';
import SearchBar from 'components/SearchBar/SearchBar';
import React, { ChangeEvent, useEffect, useState } from 'react';
import API from './../../api/api';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import useAppContext from 'AppContext';
import { AppActions, SortDropdownValues } from 'enums';
import cl from './Home.module.css';
import { HomeStateI } from './Home.interfaces';
import ResultsPerPageDropdown from 'components/ResultsPerPageDropdown/ResultsPerPageDropdown';
import SortDropdown from 'components/SortDropdown/SortDropdown';
import { PhotosInfoPhotoI } from 'api/api.interfaces';
import { Pagination } from '@mui/material';
import TotalPagesDropdown from 'components/TotalPagesDropdown/TotalPagesDropdown';

const Home = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [lastSearch, setLastSearch] = useState<string>('');
  const { appState, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    isItInitialPage,
    homeCardsSort,
    page: currPage,
    pages,
    resultsPerPage,
    paginatedHomeCards,
    pagesMaxSize,
  } = appState;

  const getSortedInterestingnessData = (homeCards: PhotosInfoPhotoI[], sortValue: string) => {
    let cards: PhotosInfoPhotoI[] = [];

    switch (sortValue) {
      case SortDropdownValues.viewsAsc:
        cards = homeCards.sort((prev, curr) => +prev.views - +curr.views);
        break;
      case SortDropdownValues.dateDesc:
        cards = homeCards.sort((prev, curr) => +curr.dateuploaded - +prev.dateuploaded);
        break;
      case SortDropdownValues.dateAsc:
        cards = homeCards.sort((prev, curr) => +prev.dateuploaded - +curr.dateuploaded);
        break;
      default:
        cards = homeCards.sort((prev, curr) => +curr.views - +prev.views);
        break;
    }

    return cards;
  };

  const getPaginatedInterestingnessData = (
    homeCards: PhotosInfoPhotoI[],
    resultsPerPage: number
  ) => {
    let cards: PhotosInfoPhotoI[] = [];
    const page: PhotosInfoPhotoI[][] = [];

    homeCards.forEach((card) => {
      if (cards.length === resultsPerPage) {
        page.push(cards);
        cards = [];
      }
      cards.push(card);
    });

    return [...page, cards];
  };

  const getPagesSize = (pagesMaxSize: number, cardsSize: number) =>
    cardsSize > pagesMaxSize ? pagesMaxSize : cardsSize;

  const load = async () => {
    try {
      setIsLoading(true);
      const { data: homeCards } = await API.getData();
      const cards = getSortedInterestingnessData(homeCards, homeCardsSort);
      const paginatedCards = getPaginatedInterestingnessData(cards, resultsPerPage);

      dispatch({
        type: AppActions.addHomeCards,
        payload: {
          ...appState,
          homeCards: paginatedCards[currPage - 1],
          paginatedHomeCards: paginatedCards,
          pages: getPagesSize(pagesMaxSize, paginatedCards.length),
        },
      });

      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const content = isLoading ? <LoadingSpinner /> : <CardList />;
  const homeState: HomeStateI = { searchValue, lastSearch, isLoading };

  const onChange = async (e: ChangeEvent<unknown>, page: number) => {
    if (page !== currPage) {
      if (isItInitialPage) {
        dispatch({
          type: AppActions.addHomeCards,
          payload: {
            ...appState,
            homeCards: paginatedHomeCards[page - 1],
            page,
          },
        });
      } else {
        try {
          setIsLoading(true);
          const { data: homeCards } = await API.getData({
            tags: lastSearch,
            sort: homeCardsSort,
            page,
            perPage: resultsPerPage,
          });
          dispatch({
            type: AppActions.addHomeCards,
            payload: {
              ...appState,
              homeCards,
              page,
            },
          });
          setIsLoading(false);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  return (
    <>
      <div className={cl.controls}>
        <SearchBar
          homeState={homeState}
          setSearchValue={setSearchValue}
          setLastSearch={setLastSearch}
          setIsLoading={setIsLoading}
          getPagesSize={getPagesSize}
        />
        <SortDropdown
          homeState={homeState}
          setIsLoading={setIsLoading}
          getSortedInterestingnessData={getSortedInterestingnessData}
          getPaginatedInterestingnessData={getPaginatedInterestingnessData}
          getPagesSize={getPagesSize}
        />
        <ResultsPerPageDropdown
          homeState={homeState}
          setIsLoading={setIsLoading}
          getSortedInterestingnessData={getSortedInterestingnessData}
          getPaginatedInterestingnessData={getPaginatedInterestingnessData}
          getPagesSize={getPagesSize}
        />
        <TotalPagesDropdown
          homeState={homeState}
          setIsLoading={setIsLoading}
          getSortedInterestingnessData={getSortedInterestingnessData}
          getPaginatedInterestingnessData={getPaginatedInterestingnessData}
          getPagesSize={getPagesSize}
        />
      </div>
      <Pagination count={pages} page={currPage} onChange={onChange} disabled={isLoading} />
      {content}
    </>
  );
};

export default Home;
