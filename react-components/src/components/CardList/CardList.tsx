import Card from 'components/Card/Card';
import React from 'react';
import { CardListState } from 'types';
import cl from './CardList.module.css';

class CardList extends React.Component {
  state: CardListState;

  constructor(props = {}) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    const loader = async () => {
      try {
        const res = await fetch('/mockData.json');
        const data = await res.json();
        this.setState({ data });
      } catch (e) {
        console.error(e);
      }
    };
    loader();
  }

  render() {
    const cards = this.state.data.map((data) => <Card key={data.id} cardData={data} />);
    return <div className={cl['card-list']}>{cards}</div>;
  }
}

export default CardList;
