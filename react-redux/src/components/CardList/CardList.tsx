import Card from 'components/Card/Card';
import React from 'react';
import cl from './CardList.module.css';
import { TestIds } from 'enums';
import { RootState } from 'redux/types';
import { useSelector } from 'react-redux';

const CardList = () => {
  const homeCards = useSelector((state: RootState) => state.homeCards);

  if (!homeCards.length) {
    return <div>Nothing found</div>;
  }

  const cards = homeCards.map((data) => <Card key={data.id} cardData={data} />);
  return (
    <div data-testid={TestIds.cards} className={cl.cardList}>
      {cards}
    </div>
  );
};

export default CardList;
