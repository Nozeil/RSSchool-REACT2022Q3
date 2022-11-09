import React, { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { SearchBarPropsI } from './SearchBar.interfaces';
import cl from './SearchBar.module.css';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import getPhotos from 'redux/thunks/getPhotos';
import { setLastSearch, updateHomePageDataAfterSearch } from 'redux/appSlice';
import getPagesSize from 'utils/getPagesSize';

const SearchBar = ({ searchValue, setSearchValue }: SearchBarPropsI) => {
  const storageKey = 'search';
  const searchBar = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { isLoading, homeCardsSort, resultsPerPage, pagesMaxSize } = useAppSelector(
    (state) => state
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      localStorage.removeItem(storageKey);
    }
    setSearchValue(e.target.value);
  };

  const onKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    const tags = e.currentTarget.value;
    const startPage = 1;
    if (e.code === 'Enter' && tags) {
      e.currentTarget.blur();
      const response = await dispatch(
        getPhotos({
          tags,
          sort: homeCardsSort,
          page: startPage,
          perPage: resultsPerPage,
        })
      ).unwrap();
      if (response) {
        dispatch(setLastSearch({ lastSearch: tags }));
        const { data: homeCards, pages } = response;
        dispatch(
          updateHomePageDataAfterSearch({
            homeCards,
            page: startPage,
            pages: getPagesSize(pagesMaxSize, pages),
            isItInitialPage: false,
          })
        );
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

  const searchBarClass = isLoading ? cl.searchBarDisabled : cl.searchBar;

  return (
    <div className={searchBarClass}>
      <input
        ref={searchBar}
        className={cl.searchInput}
        type="search"
        placeholder="Search..."
        value={searchValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button className={cl.searchButton} />
    </div>
  );
};

export default SearchBar;
