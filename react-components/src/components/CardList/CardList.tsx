import Card from 'components/Card/Card';
import React from 'react';
import { CardListState } from 'types';
import cl from './CardList.module.css';

class CardList extends React.Component<CardListState> {
  constructor(props: CardListState) {
    super(props);
  }

  render() {
    const cards = this.props.data.map((data) => <Card key={data.id} cardData={data} />);
    return (
      <div data-testid="cards" className={cl['card-list']}>
        {cards}
      </div>
    );
  }
}

export default CardList;
