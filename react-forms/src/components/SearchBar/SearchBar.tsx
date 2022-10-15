import React, { ChangeEvent, KeyboardEvent } from 'react';
import { SearchBarPropsI } from './SearchBar.interfaces';
import cl from './SearchBar.module.css';
import { default as API } from './../../api/api';

class SearchBar extends React.Component<SearchBarPropsI> {
  storageKey: string;

  constructor(props: SearchBarPropsI) {
    super(props);
    this.storageKey = 'search';
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      localStorage.removeItem(this.storageKey);
    }

    this.props.setSearchValue(e.target.value);
  };

  onKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (e.code === 'Enter' && value) {
      try {
        const photos = (await API.getPhotos(value)).photos.photo;
        const photosInfo = photos.map(async (photo) => (await API.getInfo(photo.id)).photo);
        const data = await Promise.all(photosInfo);
        this.props.setData(data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  componentDidMount = () => {
    const value = localStorage.getItem(this.storageKey);

    if (value) {
      this.props.setSearchValue(value);
    }
  };

  componentWillUnmount = (): void => {
    localStorage.setItem(this.storageKey, this.props.homeState.searchValue);
  };

  render() {
    return (
      <div className={cl.searchBar}>
        <input
          className={cl.searchInput}
          type="search"
          placeholder="Search..."
          value={this.props.homeState.searchValue}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
        <button className={cl.searchButton} />
      </div>
    );
  }
}

export default SearchBar;
