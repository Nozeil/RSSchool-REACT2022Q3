import React from 'react';
import cl from './Card.module.css';
import { CardData } from './types';

class Card extends React.Component<{ cardData: CardData }> {
  data: CardData;

  constructor(props: { cardData: CardData }) {
    super(props);
    this.data = props.cardData;
  }

  render() {
    const { img, model, price, year } = this.data;

    return (
      <div data-testid="card" className={cl.card}>
        <img data-testid="img" className={cl['card__image']} src={img} alt="car" />
        <div className={cl['card__info']}>
          <h3>{model}</h3>
          <ul className="list">
            <li className={cl['card__info-item']}>{price}</li>
            <li className={cl['card__info-item']}>Released in {year}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Card;
