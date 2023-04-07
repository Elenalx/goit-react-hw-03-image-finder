import React from 'react';
import css from './image-gallery.module.css';

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