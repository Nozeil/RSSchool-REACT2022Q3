import React, { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { SearchBarPropsI } from './SearchBar.interfaces';
import cl from './SearchBar.module.css';
import API from './../../api/api';
import useAppContext from 'app/AppContext';
import { AppActions } from 'enums';

const SearchBar = ({ homeState, setSearchValue, setIsLoading, getPagesSize }: SearchBarPropsI) => {
  const startPage = 1;
  const storageKey = 'search';
  const searchBar = useRef<HTMLInputElement>(null);
  const { appState, dispatch } = useAppContext();
  const { homeCardsSort, resultsPerPage, pagesMaxSize } = appState;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      localStorage.removeItem(storageKey);
    }
    setSearchValue(e.target.value);
  };

  const onKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    const tags = e.currentTarget.value;

    if (e.code === 'Enter' && tags) {
      try {
        e.currentTarget.blur();
        dispatch({ type: AppActions.setLastSearch, payload: { lastSearch: tags } });
        setIsLoading(true);
        const { data: homeCards, pages } = await API.getData({
          tags,
          sort: homeCardsSort,
          page: startPage,
          perPage: resultsPerPage,
        });
        dispatch({
          type: AppActions.addHomeCards,
          payload: {
            ...appState,
            homeCards,
            page: startPage,
            pages: getPagesSize(pagesMaxSize, pages),
            isItInitialPage: false,
          },
        });
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    const value = localStorage.getItem(storageKey);
    if (value) {
      setSearchValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const input = searchBar.current;

    return () => {
      if (input) {
        localStorage.setItem(storageKey, input.value);
      }
    };
  }, []);

  const searchBarClass = homeState.isLoading ? cl.searchBarDisabled : cl.searchBar;

  return (
    <div className={searchBarClass}>
      <input
        ref={searchBar}
        className={cl.searchInput}
        type="search"
        placeholder="Search..."
        value={homeState.searchValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button className={cl.searchButton} />
    </div>
  );
};

export default SearchBar;
