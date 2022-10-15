import React from 'react';
import { FormCardPropsI } from './FormCard.interfaces';
import cl from './../../Card/Card.module.css';
import { TestIds } from '../Form.enums';

class FormCard extends React.Component<FormCardPropsI> {
  render() {
    const { name, surname, date, country, gender, file } = this.props.data;

    return (
      <div className={cl.card} data-testid={TestIds.formCard}>
        <img className={cl.cardImage} src={URL.createObjectURL(file)} alt="user-image" />
        <ul className="list">
          <li className={cl.cardInfoItem}>Name: {name}</li>
          <li className={cl.cardInfoItem}>Surname: {surname}</li>
          <li className={cl.cardInfoItem}>Birthday: {date}</li>
          <li className={cl.cardInfoItem}>Country: {country}</li>
          <li className={cl.cardInfoItem}>Gender: {gender}</li>
        </ul>
      </div>
    );
  }
}

export default FormCard;
