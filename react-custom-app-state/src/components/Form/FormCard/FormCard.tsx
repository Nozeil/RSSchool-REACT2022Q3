import React from 'react';
import { FormCardPropsI } from './FormCard.interfaces';
import cl from './../Form.module.css';
import { TestIds } from 'enums';

const FormCard = ({ data }: FormCardPropsI) => {
  const { name, surname, date, country, gender, file } = data;

  return (
    <div className={cl.card} data-testid={TestIds.formCard}>
      <img className={cl.cardImage} src={URL.createObjectURL(file)} alt="user-image" />
      <ul className="list">
        <li className={cl.cardListItem}>Name: {name}</li>
        <li className={cl.cardListItem}>Surname: {surname}</li>
        <li className={cl.cardListItem}>Birthday: {date}</li>
        <li className={cl.cardListItem}>Country: {country}</li>
        <li className={cl.cardListItem}>Gender: {gender}</li>
      </ul>
    </div>
  );
};

export default FormCard;
