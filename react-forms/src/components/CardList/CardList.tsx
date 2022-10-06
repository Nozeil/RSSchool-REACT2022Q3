import Card from 'components/Card/Card';
import React from 'react';
import cl from './CardList.module.css';
import { CardListProps } from './types';

class CardList extends React.Component<CardListProps> {
  constructor(props: CardListProps) {
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
