import CardList from 'components/CardList/CardList';
import SearchBar from 'components/SearchBar/SearchBar';
import React from 'react';

class Home extends React.Component {
  render(): React.ReactElement {
    return (
      <>
        <SearchBar />
        <CardList />
      </>
    );
  }
}

export default Home;
