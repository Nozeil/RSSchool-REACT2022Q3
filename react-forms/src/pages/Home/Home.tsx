import CardList from 'components/CardList/CardList';
import { CardListProps } from 'components/CardList/types';
import SearchBar from 'components/SearchBar/SearchBar';
import React from 'react';
import { default as API } from 'api/api';

class Home extends React.Component {
  state: CardListProps;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const loader = async () => {
      try {
        const photos = (await API.getInterestingness()).photos.photo;
        const photosInfo = photos.map(async (photo) => (await API.getInfo(photo.id)).photo);
        const data = await Promise.all(photosInfo);
        this.setState(() => ({
          data,
        }));
      } catch (e) {
        console.error(e);
      }
    };
    loader();
  }

  render(): React.ReactElement {
    return (
      <>
        <SearchBar />
        <CardList data={this.state.data} />
      </>
    );
  }
}

export default Home;
