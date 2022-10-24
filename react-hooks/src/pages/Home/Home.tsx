import CardList from 'components/CardList/CardList';
import SearchBar from 'components/SearchBar/SearchBar';
import React, { useEffect, useState } from 'react';
import { default as API } from './../../api/api';
import { PhotosInfoPhotoI } from 'api/api.interfaces';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState<PhotosInfoPhotoI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loader = async () => {
      try {
        const photos = (await API.getInterestingness()).photos.photo;
        const photosInfo = photos.map(async (photo) => (await API.getInfo(photo.id)).photo);
        const data = await Promise.all(photosInfo);
        setData(data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    loader();
  }, []);

  const content = isLoading ? <LoadingSpinner /> : <CardList data={data} />;

  const updateData = (data: PhotosInfoPhotoI[], isLoading: boolean) => {
    setData(data);
    setIsLoading(isLoading);
  };

  return (
    <>
      <SearchBar
        homeState={{ searchValue, data, isLoading }}
        setSearchValue={setSearchValue}
        setData={updateData}
        setIsLoading={setIsLoading}
      />
      {content}
    </>
  );
};

export default Home;
