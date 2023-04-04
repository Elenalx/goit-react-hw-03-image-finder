import { Component } from 'react';
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
    this.props.onSubmit(this.state.value);
    this.reset();
  };

  reset = () => {
    this.setState({ value: '' });
  };

    render() {
        const { value } = this.state;
        
        return (
            <header className={css.searchBar}>
                <form className={css.searchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.button}>
                        <span className="button-label">Search</span>
                    </button>

                    <input
                        name="searchText"
                        className={css.input}
                        type="text"
                        value={value}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChange}
                    />
                </form>
            </header>
            
        );
    }

} 

export default Searchbar;

Searchbar.propTypes = {
    onSubmit:PropTypes.func.isRequired,
}
