import Card from 'components/Card/Card';
import React, { useState } from 'react';
import cl from './CardList.module.css';
import { CardListPropsI, CardListStateI } from './CardList.interfaces';
import Modal from 'components/Modal/Modal';
import { TestIds } from 'enums';

const CardList = ({ data }: CardListPropsI) => {
  const initialState: CardListStateI = {
    modalDescription: '',
    modalTags: [],
    modalSrc: '',
    modalTitle: '',
    modalSubtitle: '',
  };

  const [cardListData, setCardListData] = useState<CardListStateI>(initialState);

  const [isModalVisible, toggleModalVisibility] = useState<boolean>(false);

  const saveCardListData = (data: CardListStateI) => setCardListData(data);

  if (!data.length) {
    return <div>Nothing found</div>;
  }

  const cards = data.map((data) => (
    <Card
      key={data.id}
      cardData={data}
      saveCardListData={saveCardListData}
      toggleModalVisibility={toggleModalVisibility}
    />
  ));
  const { modalDescription, modalTags, modalSrc, modalTitle, modalSubtitle } = cardListData;
  return (
    <div data-testid={TestIds.cards} className={cl.cardList}>
      {isModalVisible && (
        <Modal
          description={modalDescription}
          title={modalTitle}
          subtitle={modalSubtitle}
          tags={modalTags}
          src={modalSrc}
          toggleModalVisibility={toggleModalVisibility}
        />
      )}
      {cards}
    </div>
  );
};

export default CardList;
