import { PhotosInfoPhotoI } from 'api/api.interfaces';
import { SortDropdownValues } from 'enums';

const getSortedInterestingnessData = (homeCards: PhotosInfoPhotoI[], sortValue: string) => {
  let cards: PhotosInfoPhotoI[] = [];

  switch (sortValue) {
    case SortDropdownValues.viewsAsc:
      cards = homeCards.sort((prev, curr) => +prev.views - +curr.views);
      break;
    case SortDropdownValues.dateDesc:
      cards = homeCards.sort((prev, curr) => +curr.dateuploaded - +prev.dateuploaded);
      break;
    case SortDropdownValues.dateAsc:
      cards = homeCards.sort((prev, curr) => +prev.dateuploaded - +curr.dateuploaded);
      break;
    default:
      cards = homeCards.sort((prev, curr) => +curr.views - +prev.views);
      break;
  }

  return cards;
};

export default getSortedInterestingnessData;
