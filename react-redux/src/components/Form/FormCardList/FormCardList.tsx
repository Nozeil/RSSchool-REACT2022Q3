import React from 'react';
import cl from './../../CardList/CardList.module.css';
import FormCard from '../FormCard/FormCard';
import { TestIds } from 'enums';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/types';

const FormCardList = () => {
  const cards = useSelector((state: RootState) => state.formCards);

  return (
    <div className={cl.cardList} data-testid={TestIds.formCardList}>
      {cards.map((card) => (
        <FormCard data={card.data} key={card.id} />
      ))}
    </div>
  );
};

export default FormCardList;
