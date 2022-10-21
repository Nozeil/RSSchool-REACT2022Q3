import CardList from 'components/CardList/CardList';
import SearchBar from 'components/SearchBar/SearchBar';
import React from 'react';
import { HomeStateI } from './Home.interfaces';
import { default as API } from './../../api/api';
import { PhotosInfoPhotoI } from 'api/api.interfaces';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

class Home extends React.Component {
  state: HomeStateI;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchValue: '',
      data: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const loader = async () => {
      try {
        const photos = (await API.getInterestingness()).photos.photo;
        const photosInfo = photos.map(async (photo) => (await API.getInfo(photo.id)).photo);
        const data = await Promise.all(photosInfo);
        this.setState(() => ({ data, isLoading: false }));
      } catch (e) {
        console.error(e);
      }
    };
    loader();
  }

  setSearchValue = (searchValue: string) => this.setState(() => ({ searchValue }));

  setData = (data: PhotosInfoPhotoI[], isLoading: boolean) =>
    this.setState(() => ({ data, isLoading }));

  setIsLoading = (isLoading: boolean) => this.setState(() => ({ isLoading }));

  render() {
    const { isLoading, data } = this.state;
    const content = isLoading ? <LoadingSpinner /> : <CardList data={data} />;

    return (
      <>
        <SearchBar
          homeState={this.state}
          setSearchValue={this.setSearchValue}
          setData={this.setData}
          setIsLoading={this.setIsLoading}
        />
        {content}
      </>
    );
  }
}

export default Home;
