import React, { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { SearchBarPropsI } from './SearchBar.interfaces';
import cl from './SearchBar.module.css';
import updateStateAfterSearch from 'redux/thunks/updateStateAfterSearch';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';

const SearchBar = ({ searchValue, setSearchValue }: SearchBarPropsI) => {
  const storageKey = 'search';
  const searchBar = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.isLoading);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      localStorage.removeItem(storageKey);
    }
    setSearchValue(e.target.value);
  };

  const onKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    dispatch(updateStateAfterSearch(e));
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
