import React, { ChangeEvent } from 'react';

class SearchBar extends React.Component {
  state: { value: string };

  constructor(props = {}) {
    super(props);
    this.state = { value: '' };
  }

  onChange = (e: ChangeEvent) => {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        value: e.target.value,
      });
    }
  };

  componentDidMount = (): void => {
    const value = localStorage.getItem('search');

    if (value) {
      this.setState({ value });
    }
  };

  componentWillUnmount = (): void => {
    const value = localStorage.getItem('search');

    if (!value) {
      localStorage.setItem('search', this.state.value);
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
