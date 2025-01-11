import '../../styles.css';

export const ImageGalleryItem = ({ data, onSelectedImage }) => {
  if (!data || data.length === 0) {
    return <p>No images found</p>;
  }

  return data.map(image => {
    return (
      <li key={image.largeImageURL} className="ImageGalleryItem">
        <img
          src={image.webformatURL}
          alt={image.tags}
          onClick={() => onSelectedImage(image.largeImageURL)}
          className="ImageGalleryItem-image"
        />
      </li>
    );
  });
};
