import React, { ChangeEvent } from 'react';
import cl from './SearchBar.module.css';

class SearchBar extends React.Component {
  state: { value: string };
  storageKey: string;

  constructor(props = {}) {
    super(props);
    this.state = { value: '' };
    this.storageKey = 'search';
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      localStorage.removeItem(this.storageKey);
    }

    this.setState({
      value: e.target.value,
    });
  };

  componentDidMount = (): void => {
    const value = localStorage.getItem(this.storageKey);

    if (value) {
      this.setState({ value });
    }
  };

  componentWillUnmount = (): void => {
    localStorage.setItem(this.storageKey, this.state.value);
  };

  render(): React.ReactNode {
    return (
      <div className={cl['search-bar']}>
        <input
          className={cl['search-input']}
          type="search"
          placeholder="Search..."
          value={this.state.value}
          onChange={this.onChange}
        />
        <button className={cl['search-button']} />
      </div>
    );
  }
}

export default SearchBar;
