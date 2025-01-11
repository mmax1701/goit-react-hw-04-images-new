import '../../styles.css';

export const Modal = ({ selectedImage }) => {
  return (
    <div className="Overlay">
      <div className="Modal">
        <img src={selectedImage} alt="#" />
      </div>
    </div>
  );
};
