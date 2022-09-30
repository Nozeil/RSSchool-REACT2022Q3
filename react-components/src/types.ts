export type MockData = CardData[];
export type CardListState = {
  data: MockData;
};
export type CardData = {
  id: string;
  price: string;
  model: string;
  year: string;
  img: string;
};
