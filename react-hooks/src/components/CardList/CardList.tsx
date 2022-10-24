import Card from 'components/Card/Card';
import React, { useState } from 'react';
import cl from './CardList.module.css';
import { CardListPropsI, CardListStateI } from './CardList.interfaces';
import Modal from 'components/Modal/Modal';

const CardList = ({ data }: CardListPropsI) => {
  const [state, setState] = useState<CardListStateI>({
    modalDescription: '',
    modalTags: [],
    isModalOpen: false,
    modalSrc: '',
    modalTitle: '',
    modalSubtitle: '',
  });

  const setListState = (listState: CardListStateI) => {
    setState({ ...listState });
  };

  const toggleModalVisibility = (isModalOpen: boolean) =>
    setState((prevState) => ({ ...prevState, isModalOpen }));

  if (!data.length) {
    return <div>Nothing found</div>;
  }

  const cards = data.map((data) => (
    <Card key={data.id} cardData={data} setListState={setListState} />
  ));
  const { modalDescription, modalTags, modalSrc, modalTitle, modalSubtitle, isModalOpen } = state;
  return (
    <div data-testid="cards" className={cl.cardList}>
      {isModalOpen && (
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
