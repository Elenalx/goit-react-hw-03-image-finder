import React from 'react';
import PropTypes from 'prop-types';
import css from './button.module.css';

export const Button = ({ onClick }) => {
    return (
      <div className={css.button}>
         <button type="button" className={css.buttonLoader} onClick={onClick}>Load more</button>
     </div>
  );
};


Button.propTypes = {
  onClick:PropTypes.func.isRequired,
}