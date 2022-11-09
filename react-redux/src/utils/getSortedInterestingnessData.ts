import { PhotosInfoPhotoI } from 'api/api.interfaces';
import { SortDropdownValues } from 'enums';

const getSortedInterestingnessData = (homeCards: PhotosInfoPhotoI[], sortValue: string) => {
  const cards: PhotosInfoPhotoI[] = [...homeCards];

  switch (sortValue) {
    case SortDropdownValues.viewsAsc:
      return cards.sort((prev, curr) => +prev.views - +curr.views);
    case SortDropdownValues.dateDesc:
      return cards.sort((prev, curr) => +curr.dateuploaded - +prev.dateuploaded);
    case SortDropdownValues.dateAsc:
      return cards.sort((prev, curr) => +prev.dateuploaded - +curr.dateuploaded);
    default:
      return cards.sort((prev, curr) => +curr.views - +prev.views);
  }
};

export default getSortedInterestingnessData;
