import React from 'react';
import cl from './../../CardList/CardList.module.css';

import FormCard from '../FormCard/FormCard';
import { FormCardListPropsI } from './FormCardList.interfaces';

class FormCardList extends React.Component<FormCardListPropsI> {
  render() {
    return (
      <div className={cl['card-list']} data-testid="formCardList">
        {this.props.cards.map((card) => (
          <FormCard data={card.data} key={card.id} />
        ))}
      </div>
    );
  }
}

export default FormCardList;
