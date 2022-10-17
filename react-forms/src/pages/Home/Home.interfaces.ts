import { PhotosInfoPhotoI } from 'api/api.interfaces';

export interface HomeStateI {
  searchValue: string;
  data: PhotosInfoPhotoI[];
  isLoading: boolean;
}
