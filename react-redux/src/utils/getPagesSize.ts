const getPagesSize = (pagesMaxSize: number, cardsSize: number) =>
  cardsSize > pagesMaxSize ? pagesMaxSize : cardsSize;

export default getPagesSize;
