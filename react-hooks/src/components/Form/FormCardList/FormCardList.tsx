import React from 'react';
import cl from './../../CardList/CardList.module.css';

import FormCard from '../FormCard/FormCard';
import { FormCardListPropsI } from './FormCardList.interfaces';
import { TestIds } from '../Form.enums';

const FormCardList = ({ cards }: FormCardListPropsI) => (
  <div className={cl.cardList} data-testid={TestIds.formCardList}>
    {cards.map((card) => (
      <FormCard data={card.data} key={card.id} />
    ))}
  </div>
);

export default FormCardList;
