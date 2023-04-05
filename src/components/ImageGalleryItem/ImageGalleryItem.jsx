import React from 'react';
import PropTypes from 'prop-types';


export const ImageGalleryItem = ({ webformatURL,largeImageURL,openModal }) => {
  return (
    <li 
    onClick = {() => {
      openModal(largeImageURL)
    }}>
      <img src={webformatURL} alt="describe" width="400px" height="250px"/>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  openModal : PropTypes.func.isRequired,
  largeImageURL : PropTypes.string.isRequired
}