import Card from 'components/Card/Card';
import React from 'react';
import cl from './CardList.module.css';
import { CardListPropsI } from './CardList.interfaces';

class CardList extends React.Component<CardListPropsI> {
  render() {
    const cards = this.props.data.map((data) => <Card key={data.id} cardData={data} />);
    return (
      <div data-testid="cards" className={cl.cardList}>
        {cards}
      </div>
    );
  }
}

export default CardList;
