import { PhotosInfoPhotoI } from 'api/api.interfaces';
import { HomeStateI } from 'pages/Home/Home.interfaces';

export interface SearchBarPropsI {
  homeState: HomeStateI;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setData: React.Dispatch<React.SetStateAction<PhotosInfoPhotoI[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
