import { PhotosInfoPhotoI } from 'api/api.interfaces';
import { CardListStateI } from 'components/CardList/CardList.interfaces';

export interface CardPropsI {
  cardData: PhotosInfoPhotoI;
  saveCardListData: (data: CardListStateI) => void;
  toggleModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}
