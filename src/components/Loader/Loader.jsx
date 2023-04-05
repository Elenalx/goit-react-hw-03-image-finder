
import React from 'react';
import { Audio } from 'react-loader-spinner';
import css from './loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loader} >
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle
      />
    </div>
  );
};
