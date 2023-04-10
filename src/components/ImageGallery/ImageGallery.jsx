import React from 'react';
import css from './image-gallery.module.css';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';


export const ImageGallery = ({ data,onImageClick }) => {
  return (
    <ul className={css.imageGallery}>
      {data.map(({ id, webformatURL,largeImageURL }) => (
        <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} openModal={onImageClick}  />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.string.isRequired,
  onImageClick: PropTypes.string.isRequired,
}