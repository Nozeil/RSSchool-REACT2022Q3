import { PhotosInfoPhotoI } from 'api/api.interfaces';
import React from 'react';
import cl from './Card.module.css';

class Card extends React.Component<{ cardData: PhotosInfoPhotoI }> {
  photos: PhotosInfoPhotoI;

  constructor(props: { cardData: PhotosInfoPhotoI }) {
    super(props);
    this.photos = props.cardData;
  }

  render() {
    const { title, secret, server, id, owner } = this.photos;
    const newTitle = title._content ? title._content : 'Nice photo';
    console.log(this.photos);
    return (
      <div data-testid="card" className={cl.card}>
        <div className={cl.cardShortInfo}>
          <h3 className={cl.cardTitle}>{newTitle}</h3>
          <h3 className={cl.cardSubtitle}>by {owner.username}</h3>
        </div>

        <img
          data-testid="img"
          className={cl.cardImage}
          src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}
          alt="photo"
        />
      </div>
    );
  }
}

export default Card;
