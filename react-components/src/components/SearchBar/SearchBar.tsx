import React, { ChangeEvent } from 'react';

class SearchBar extends React.Component {
  state: { value: string };
  storageKey: string;

  constructor(props = {}) {
    super(props);
    this.state = { value: '' };
    this.storageKey = 'search';
  }

  onChange = (e: ChangeEvent) => {
    if (e.target instanceof HTMLInputElement) {
      if (!e.target.value) {
        localStorage.removeItem(this.storageKey);
      }

      this.setState({
        value: e.target.value,
      });
    }
  };

  componentDidMount = (): void => {
    const value = localStorage.getItem(this.storageKey);

    if (value) {
      this.setState({ value });
    }
  };

  componentWillUnmount = (): void => {
    const value = localStorage.getItem(this.storageKey);

    if (!value) {
      localStorage.setItem(this.storageKey, this.state.value);
    }
  };

  render(): React.ReactNode {
    return (
      <div className="">
        <input
          type="search"
          placeholder="Search..."
          value={this.state.value}
          onChange={this.onChange}
        />
        <button>Search</button>
      </div>
    );
  }
}

export default SearchBar;
