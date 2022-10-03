import React from 'react';
import { CardData } from 'types';
import cl from './Card.module.css';

class Card extends React.Component<{ cardData: CardData }> {
  data: CardData;

  constructor(props: { cardData: CardData }) {
    super(props);
    this.data = props.cardData;
  }

  render() {
    return (
      <div data-testid="card" className={cl.card}>
        <img data-testid="img" className={cl['card__image']} src={this.data.img} alt="car" />
        <div className={cl['card__info']}>
          <h3>{this.data.model}</h3>
          <ul className="list">
            <li className={cl['card__info-item']}>{this.data.price}</li>
            <li className={cl['card__info-item']}>Released in {this.data.year}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Card;
