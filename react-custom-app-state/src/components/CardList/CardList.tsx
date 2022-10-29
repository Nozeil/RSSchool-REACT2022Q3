import Card from 'components/Card/Card';
import React, { useState } from 'react';
import cl from './CardList.module.css';
import { CardListStateI } from './CardList.interfaces';
import Modal from 'components/Modal/Modal';
import { TestIds } from 'enums';
import useAppContext from 'AppContext';

const CardList = () => {
  const initialState: CardListStateI = {
    modalDescription: '',
    modalTags: [],
    modalSrc: '',
    modalTitle: '',
    modalSubtitle: '',
  };

  const [cardListData, setCardListData] = useState<CardListStateI>(initialState);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { appState } = useAppContext();
  const homeCards = appState.homeCards;

  const saveCardListData = (data: CardListStateI) => setCardListData(data);

  if (!homeCards.length) {
    return <div>Nothing found</div>;
  }

  const cards = homeCards.map((data) => (
    <Card
      key={data.id}
      cardData={data}
      saveCardListData={saveCardListData}
      setIsModalVisible={setIsModalVisible}
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
          setIsModalVisible={setIsModalVisible}
        />
      )}
      {cards}
    </div>
  );
};

export default CardList;
