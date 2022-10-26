import CardList from 'components/CardList/CardList';
import SearchBar from 'components/SearchBar/SearchBar';
import React, { useEffect, useState } from 'react';
import { default as API } from './../../api/api';
import { PhotosInfoPhotoI } from 'api/api.interfaces';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

const Home = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [data, setData] = useState<PhotosInfoPhotoI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const load = async () => {
    try {
      setData(await API.getData());
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const content = isLoading ? <LoadingSpinner /> : <CardList data={data} />;

  return (
    <>
      <SearchBar
        homeState={{ searchValue, data, isLoading }}
        setSearchValue={setSearchValue}
        setData={setData}
        setIsLoading={setIsLoading}
      />
      {content}
    </>
  );
};

export default Home;
