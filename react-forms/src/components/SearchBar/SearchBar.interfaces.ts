import { PhotosInfoPhotoI } from 'api/api.interfaces';
import { HomeStateI } from 'pages/Home/Home.interfaces';

export interface SearchBarPropsI {
  homeState: HomeStateI;
  setSearchValue: (searchValue: string) => void;
  setData: (data: PhotosInfoPhotoI[]) => void;
}
