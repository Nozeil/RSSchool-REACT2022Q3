import CardList from 'components/CardList/CardList';
import SearchBar from 'components/SearchBar/SearchBar';
import React from 'react';
import { CardListState } from 'types';

class Home extends React.Component {
  state: CardListState;
  baseUrl: string;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      data: [],
    };
    this.baseUrl = '/mockData.json';
  }

  componentDidMount(): void {
    const loader = async () => {
      try {
        const res = await fetch(this.baseUrl);
        const data = await res.json();
        this.setState({ data });
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
