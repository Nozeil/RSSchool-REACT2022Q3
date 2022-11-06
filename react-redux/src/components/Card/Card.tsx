import { TestIds } from 'enums';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCardPageData } from 'redux/appSlice';
import { CardPropsI } from './Card.interfaces';
import cl from './Card.module.css';

const Card = ({ cardData }: CardPropsI) => {
  const dispatch = useDispatch();
  const { title, secret, server, id, owner, description, tags } = cardData;
  const newTitle = title._content ? title._content : 'Photo';
  const src = `https://live.staticflickr.com/${server}/${id}_${secret}_b.jpg`;

  const onClick = () => {
    const cardPageData = {
      id,
      description: description._content,
      tags: tags.tag,
      src: src,
      title: newTitle,
      subtitle: owner.username,
    };

    dispatch(setCardPageData({ cardPageData: cardPageData }));
  };

  return (
    <Link
      to={`cardPage/${id}`}
      relative="path"
      data-testid={TestIds.card}
      className={cl.card}
      onClick={onClick}
    >
      <div className={cl.cardShortInfo}>
        <h3 className={cl.cardTitle}>{newTitle}</h3>
        <h3 className={cl.cardSubtitle}>by {owner.username}</h3>
      </div>

      <img data-testid={TestIds.cardImg} className={cl.cardImage} src={src} alt="photo" />
    </Link>
  );
};

export default Card;
