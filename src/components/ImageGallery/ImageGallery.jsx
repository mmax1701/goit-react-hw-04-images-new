import { useEffect, useState } from 'react';
import { Loader } from 'components/Loader/Loader';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMore } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import '../../styles.css';

export const ImageGallery = ({ inputValue }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (inputValue) {
      setLoading(true);
      fetch(
        `https://pixabay.com/api/?q=${inputValue}&page=${page}&key=37350286-5f3aac9a725d44d4223b6e61c&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data => setData(data))
        .finally(() => setLoading(false, setPage(1)));
    }
  }, [inputValue]);

  const loadImages = () => {
    setLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${inputValue}&page=${
        page + 1
      }&key=37350286-5f3aac9a725d44d4223b6e61c&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(data =>
        setData(prevState => ({
          hits: [...prevState.hits, ...data.hits],
        }))
      )
      .finally(() => setLoading(false, setPage(page + 1)));
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  const handleOverlayClick = e => {
    if (e.target.classList.contains('Overlay')) {
      onCloseModal();
    }
  };

  const onCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);

    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('click', handleOverlayClick);
  };

  const onSelectedImage = image => {
    setSelectedImage(image);
    setShowModal(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleOverlayClick);
  };

  return (
    <>
      {loading && <Loader />}
      <ul className="ImageGallery">
        {data && (
          <ImageGalleryItem
            data={data.hits}
            onSelectedImage={onSelectedImage}
          />
        )}
        {data && <LoadMore loadImages={loadImages} />}
      </ul>
      {showModal && (
        <div onClick={handleOverlayClick}>
          <Modal selectedImage={selectedImage} />
        </div>
      )}
    </>
  );
};
