import CardList from 'components/CardList/CardList';
import SearchBar from 'components/SearchBar/SearchBar';
import React from 'react';
import { HomeStateI } from './Home.interfaces';
import { default as API } from './../../api/api';
import { PhotosInfoPhotoI } from 'api/api.interfaces';

class Home extends React.Component {
  state: HomeStateI;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchValue: '',
      data: [],
    };
  }

  componentDidMount() {
    const loader = async () => {
      try {
        const photos = (await API.getInterestingness()).photos.photo;
        const photosInfo = photos.map(async (photo) => (await API.getInfo(photo.id)).photo);
        const data = await Promise.all(photosInfo);
        this.setState(() => ({ data }));
      } catch (e) {
        console.error(e);
      }
    };
    loader();
  }

  render() {
    return (
      <>
        <SearchBar
          homeState={this.state}
          setSearchValue={(searchValue: string) => this.setState(() => ({ searchValue }))}
          setData={(data: PhotosInfoPhotoI[]) => this.setState(() => ({ data }))}
        />
        <CardList data={this.state.data} />
      </>
    );
  }
}

export default Home;
