import '../../styles.css';

export const LoadMore = ({ loadImages }) => {
  return (
    <button type="button" className="Button" onClick={() => loadImages()}>
      Load more
    </button>
  );
};
