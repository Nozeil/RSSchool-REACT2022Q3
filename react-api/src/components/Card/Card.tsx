import { PhotosInfoPhotoI } from 'api/api.interfaces';
import { CardListStateI } from 'components/CardList/CardList.interfaces';
import React from 'react';
import { CardPropsI } from './Card.interfaces';
import cl from './Card.module.css';

class Card extends React.Component<CardPropsI> {
  photos: PhotosInfoPhotoI;

  constructor(props: CardPropsI) {
    super(props);
    this.photos = props.cardData;
  }

  onClick = (listState: CardListStateI) => {
    this.props.setListState(listState);
  };

  render() {
    const { title, secret, server, id, owner, description, tags } = this.photos;
    const newTitle = title._content ? title._content : 'Photo';
    const src = `https://live.staticflickr.com/${server}/${id}_${secret}_c.jpg`;

    return (
      <div
        data-testid="card"
        className={cl.card}
        onClick={() =>
          this.onClick({
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
  }
}

export default Card;
