import React from 'react';
import { FormCardPropsI } from './FormCard.interfaces';
import cl from './../../Card/Card.module.css';

class FormCard extends React.Component<FormCardPropsI> {
  render() {
    const { name, surname, date, country, gender, file } = this.props.data;

    return (
      <div className={cl.card}>
        <img className={cl.card__image} src={URL.createObjectURL(file)} alt="user-image" />
        <ul className="list">
          <li className={cl['card__info-team']}>Name: {name}</li>
          <li className={cl['card__info-team']}>Surname: {surname}</li>
          <li className={cl['card__info-team']}>Birthday: {date}</li>
          <li className={cl['card__info-team']}>Country: {country}</li>
          <li className={cl['card__info-team']}>Gender: {gender}</li>
        </ul>
      </div>
    );
  }
}

export default FormCard;
