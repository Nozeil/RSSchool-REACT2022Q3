import Card from 'components/Card/Card';
import React from 'react';
import cl from './CardList.module.css';
import { CardListPropsI, CardListStateI } from './CardList.interfaces';
import Modal from 'components/Modal/Modal';

class CardList extends React.Component<CardListPropsI, CardListStateI> {
  constructor(props: CardListPropsI) {
    super(props);
    this.state = {
      modalDescription: '',
      modalTags: [],
      isModalOpen: false,
      modalSrc: '',
      modalTitle: '',
      modalSubtitle: '',
    };
  }

  setListState = (listState: CardListStateI) => {
    const setState = (listState: CardListStateI) => listState;
    this.setState(setState({ ...listState }));
  };

  setModal = (isModalOpen: boolean) => this.setState(() => ({ isModalOpen }));

  render() {
    if (!this.props.data.length) {
      return <div>Nothing found</div>;
    }

    const cards = this.props.data.map((data) => (
      <Card key={data.id} cardData={data} setListState={this.setListState} />
    ));
    const { modalDescription, modalTags, modalSrc, modalTitle, modalSubtitle, isModalOpen } =
      this.state;
    return (
      <div data-testid="cards" className={cl.cardList}>
        {isModalOpen && (
          <Modal
            description={modalDescription}
            title={modalTitle}
            subtitle={modalSubtitle}
            tags={modalTags}
            src={modalSrc}
            setModal={this.setModal}
          />
        )}
        {cards}
      </div>
    );
  }
}

export default CardList;
