import React, { useState, useEffect } from 'react';
import { fetchImages } from '../api.services/api';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import CustomLoader from '../Loader/Loader';

import s from './App.module/App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (query !== '') {
      fetchImagesData();
    }
  }, [query]);

  useEffect(() => {
    if (page > 1) {
      fetchImagesData();
    }
  }, [page]);

  const fetchImagesData = async () => {
    setIsLoading(true);

    try {
      const { hits, totalHits } = await fetchImages(query, page);

      setImages(prevImages => [...prevImages, ...hits]);
      setTotalHits(totalHits);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeQuery = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onSelectImage = selectedImage => {
    setSelectedImage(selectedImage);
    setShowModal(true);
  };

  const onCloseModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={onChangeQuery} />

      <ImageGallery images={images} onSelect={onSelectImage} />
      {isLoading && <CustomLoader />}
      {images.length > 0 && !isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {images.length < totalHits && <Button onClick={loadMoreImages} />}
        </div>
      )}
      {showModal && <Modal image={selectedImage} onClose={onCloseModal} />}
    </div>
  );
};

export default App;
