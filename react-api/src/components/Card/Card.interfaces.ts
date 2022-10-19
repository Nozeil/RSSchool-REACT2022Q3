import { PhotosInfoPhotoI } from 'api/api.interfaces';
import { CardListStateI } from 'components/CardList/CardList.interfaces';

export interface CardPropsI {
  cardData: PhotosInfoPhotoI;
  setListState: (listState: CardListStateI) => void;
}
