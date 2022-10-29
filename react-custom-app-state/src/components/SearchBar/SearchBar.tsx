import React, { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { SearchBarPropsI } from './SearchBar.interfaces';
import cl from './SearchBar.module.css';
import API from './../../api/api';
import useAppContext from 'AppContext';
import { AppActions } from 'enums';

const SearchBar = ({ homeState, setSearchValue, setIsLoading }: SearchBarPropsI) => {
  const storageKey = 'search';
  const searchBar = useRef<HTMLInputElement>(null);
  const { dispatch } = useAppContext();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      localStorage.removeItem(storageKey);
    }
    setSearchValue(e.target.value);
  };

  const onKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (e.code === 'Enter' && value) {
      try {
        e.currentTarget.blur();
        setIsLoading(true);
        const homeCards = await API.getData(value);
        dispatch({ type: AppActions.addHomeCards, payload: { homeCards } });
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
