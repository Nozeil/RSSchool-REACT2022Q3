import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SearchBar from './SearchBar';

const localStorageMock = function () {
  let storage: { [k: string]: string } = {};

  return {
    setItem(key: string, value: string) {
      storage[key] = value;
    },
    getItem(key: string) {
      return storage[key] || null;
    },
    removeItem(key: string) {
      delete storage[key];
    },
    clear() {
      storage = {};
    },
    getStorage() {
      return storage;
    },
  };
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock(),
});

describe('Local storage', () => {
  beforeEach(() => localStorage.clear());

  const [key, value] = ['search', 'test-value'];

  it('should render search bar', () => {
    render(<SearchBar />);

    const [button, input] = [screen.getByRole('button'), screen.getByPlaceholderText('Search...')];

    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toHaveClass('search-button');
  });

  it('should call getItem method', () => {
    const getItemSpy = jest.spyOn(localStorage, 'getItem');

    render(<SearchBar />);

    expect(getItemSpy).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem(key)).toBe(null);

    localStorage.setItem(key, value);
    expect(localStorage.getItem(key)).toBe(value);
  });

  it('should call removeItem method', () => {
    const removeItemSpy = jest.spyOn(localStorage, 'removeItem');

    render(<SearchBar />);

    const search = screen.getByRole('searchbox') as HTMLInputElement;

    userEvent.type(search, value);

    fireEvent.change(search, { target: { value: '' } });

    expect(removeItemSpy).toHaveBeenCalledTimes(1);
  });

  it('should call setItem method', () => {
    const setItemSpy = jest.spyOn(localStorage, 'setItem');
    const { unmount } = render(<SearchBar />);
    unmount();
    expect(setItemSpy).toBeCalledTimes(1);
  });
});
