import React, { Component } from 'react';

import PropTypes from 'prop-types';
import css from './search-bar.module.css';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = e => {
    this.setState({ value: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSearch(this.state.value);
    this.reset();
  };

  reset = () => {
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <header className={css.searchbar}>
        <form className={css.saerchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.buttonValue}>
            <span style={{marginRight:8, width:"20", height:"20"}}>Search</span>
          </button>

          <input className={css.inputValue}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  handleSearch:PropTypes.func.isRequired,
}
