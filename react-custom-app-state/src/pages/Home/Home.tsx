import CardList from 'components/CardList/CardList';
import SearchBar from 'components/SearchBar/SearchBar';
import React, { useEffect, useState } from 'react';
import API from './../../api/api';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import useAppContext from 'AppContext';
import { AppActions } from 'enums';

const Home = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { appState, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const load = async () => {
    try {
      if (!appState.homeCards.length) {
        const homeCards = await API.getData();
        dispatch({ type: AppActions.addHomeCards, payload: { homeCards } });
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const content = isLoading ? <LoadingSpinner /> : <CardList />;

  return (
    <>
      <SearchBar
        homeState={{ searchValue, isLoading }}
        setSearchValue={setSearchValue}
        setIsLoading={setIsLoading}
      />
      {content}
    </>
  );
};

export default Home;
