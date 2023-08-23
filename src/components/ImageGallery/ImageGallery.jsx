import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module/ImageGallery.module.css';

const ImageGallery = ({ images, onSelect }) => {
  const [galleryImages, setGalleryImages] = useState(images);

  useEffect(() => {
    setGalleryImages(images);
  }, [images]);

  return (
    <ul className={s.ImageGallery}>
      {galleryImages.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ImageGallery;
