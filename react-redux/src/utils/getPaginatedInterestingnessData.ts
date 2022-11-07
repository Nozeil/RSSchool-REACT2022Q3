import { PhotosInfoPhotoI } from 'api/api.interfaces';

const getPaginatedInterestingnessData = (homeCards: PhotosInfoPhotoI[], resultsPerPage: number) => {
  let cards: PhotosInfoPhotoI[] = [];
  const page: PhotosInfoPhotoI[][] = [];

  homeCards.forEach((card) => {
    if (cards.length === resultsPerPage) {
      page.push(cards);
      cards = [];
    }
    cards.push(card);
  });

  return [...page, cards];
};

export default getPaginatedInterestingnessData;
