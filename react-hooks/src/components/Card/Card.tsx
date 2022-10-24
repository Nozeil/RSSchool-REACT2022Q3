import { CardListStateI } from 'components/CardList/CardList.interfaces';
import React from 'react';
import { CardPropsI } from './Card.interfaces';
import cl from './Card.module.css';

const Card = ({ setListState, cardData }: CardPropsI) => {
  const onClick = (listState: CardListStateI) => {
    setListState(listState);
  };

  const { title, secret, server, id, owner, description, tags } = cardData;
  const newTitle = title._content ? title._content : 'Photo';
  const src = `https://live.staticflickr.com/${server}/${id}_${secret}_c.jpg`;

  return (
    <div
      data-testid="card"
      className={cl.card}
      onClick={() =>
        onClick({
          modalDescription: description._content,
          modalTags: tags.tag,
          isModalOpen: true,
          modalSrc: src,
          modalTitle: newTitle,
          modalSubtitle: owner.username,
        })
      }
    >
      <div className={cl.cardShortInfo}>
        <h3 className={cl.cardTitle}>{newTitle}</h3>
        <h3 className={cl.cardSubtitle}>by {owner.username}</h3>
      </div>

      <img data-testid="img" className={cl.cardImage} src={src} alt="photo" />
    </div>
  );
};

export default Card;
