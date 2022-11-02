import { render, screen } from '@testing-library/react';
import React from 'react';
import SearchBar from './SearchBar';
import { mockStorage } from '__mocks__/localStorageMock';
import userEvent from '@testing-library/user-event';

const [homeState, setSearchValue, setIsLoading, setLastSearch, getPagesSize] = [
  {
    searchValue: 'search',
    data: [],
    isLoading: false,
    lastSearch: 'lastSearch',
  },
  jest.fn(),
  jest.fn(),
  jest.fn(),
  jest.fn(),
];

describe('Local storage', () => {
  mockStorage();
  beforeEach(() => localStorage.clear());

  const [key, value] = ['search', 'test-value'];

  it('should render search bar', () => {
    render(
      <SearchBar
        homeState={homeState}
        setIsLoading={setIsLoading}
        setSearchValue={setSearchValue}
        setLastSearch={setLastSearch}
        getPagesSize={getPagesSize}
      />
    );
    const [button, input] = [screen.getByRole('button'), screen.getByPlaceholderText('Search...')];

    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toHaveClass('searchButton');
  });

  it('should call getItem method', () => {
    const getItemSpy = jest.spyOn(localStorage, 'getItem');
    render(
      <SearchBar
        homeState={homeState}
        setIsLoading={setIsLoading}
        setSearchValue={setSearchValue}
        setLastSearch={setLastSearch}
        getPagesSize={getPagesSize}
      />
    );
    expect(getItemSpy).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem(key)).toBe(null);

    localStorage.setItem(key, value);
    expect(localStorage.getItem(key)).toBe(value);
  });

  it('should call removeItem method', () => {
    const removeItemSpy = jest.spyOn(localStorage, 'removeItem');
    const { getByRole } = render(
      <SearchBar
        homeState={homeState}
        setIsLoading={setIsLoading}
        setSearchValue={setSearchValue}
        setLastSearch={setLastSearch}
        getPagesSize={getPagesSize}
      />
    );
    const search = getByRole('searchbox');
    userEvent.clear(search);
    expect(removeItemSpy).toHaveBeenCalledTimes(1);
  });

  it('should call setItem method', () => {
    const setItemSpy = jest.spyOn(localStorage, 'setItem');
    const { unmount } = render(
      <SearchBar
        homeState={homeState}
        setIsLoading={setIsLoading}
        setSearchValue={setSearchValue}
        setLastSearch={setLastSearch}
        getPagesSize={getPagesSize}
      />
    );
    unmount();
    expect(setItemSpy).toBeCalledTimes(1);
  });
});
