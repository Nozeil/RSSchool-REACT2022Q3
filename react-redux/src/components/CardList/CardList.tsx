import Card from 'components/Card/Card';
import React from 'react';
import cl from './CardList.module.css';
import { TestIds } from 'enums';
import useAppContext from 'AppContext';

const CardList = () => {
  const { appState } = useAppContext();
  const homeCards = appState.homeCards;

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
