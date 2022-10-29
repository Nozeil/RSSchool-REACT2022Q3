import { HomeStateI } from 'pages/Home/Home.interfaces';

export interface SearchBarPropsI {
  homeState: HomeStateI;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
