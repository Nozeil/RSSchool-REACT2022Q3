import { TestIds } from 'enums';
import React from 'react';
import { CardPropsI } from './Card.interfaces';
import cl from './Card.module.css';

const Card = ({ saveCardListData, cardData, toggleModalVisibility }: CardPropsI) => {
  const { title, secret, server, id, owner, description, tags } = cardData;
  const newTitle = title._content ? title._content : 'Photo';
  const src = `https://live.staticflickr.com/${server}/${id}_${secret}_c.jpg`;

  const onClick = () => {
    saveCardListData({
      modalDescription: description._content,
      modalTags: tags.tag,
      modalSrc: src,
      modalTitle: newTitle,
      modalSubtitle: owner.username,
    });
    toggleModalVisibility(true);
  };

  return (
    <div data-testid={TestIds.card} className={cl.card} onClick={onClick}>
      <div className={cl.cardShortInfo}>
        <h3 className={cl.cardTitle}>{newTitle}</h3>
        <h3 className={cl.cardSubtitle}>by {owner.username}</h3>
      </div>

      <img data-testid={TestIds.cardImg} className={cl.cardImage} src={src} alt="photo" />
    </div>
  );
};

export default Card;
