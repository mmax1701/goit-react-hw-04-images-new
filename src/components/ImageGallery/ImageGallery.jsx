import { Component } from 'react';
import { Loader } from 'components/Loader/Loader';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMore } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import '../../styles.css';

export class ImageGallery extends Component {
  state = {
    data: null,
    loading: false,
    page: 1,
    showModal: false,
    selectedImage: null,
  };

  componentDidUpdate(prevProps, _) {
    const searchImage = this.props.inputValue;

    if (prevProps.inputValue !== this.props.inputValue) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${searchImage}&page=${this.state.page}&key=37350286-5f3aac9a725d44d4223b6e61c&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data => this.setState({ data }))
        .finally(() => this.setState({ loading: false, page: 1 }));
    }
  }

  loadImages = () => {
    this.setState({ loading: true });
    fetch(
      `https://pixabay.com/api/?q=${this.props.inputValue}&page=${
        this.state.page + 1
      }&key=37350286-5f3aac9a725d44d4223b6e61c&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(data =>
        this.setState(prevState => ({
          data: { hits: [...prevState.data.hits, ...data.hits] },
          page: prevState.page + 1,
        }))
      )
      .finally(() => this.setState({ loading: false }));
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.onCloseModal();
    }
  };

  handleOverlayClick = e => {
    if (e.target.classList.contains('Overlay')) {
      this.onCloseModal();
    }
  };

  onCloseModal = () => {
    this.setState({ showModal: false, selectedImage: null });

    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('click', this.handleOverlayClick);
  };

  onSelectedImage = image => {
    this.setState({ selectedImage: image, showModal: true });

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('click', this.handleOverlayClick);
  };

  render() {
    return (
      <>
        {this.state.loading && <Loader />}
        <ul className="ImageGallery">
          {this.state.data && (
            <ImageGalleryItem
              data={this.state.data.hits}
              onSelectedImage={this.onSelectedImage}
            />
          )}
          {this.state.data && <LoadMore loadImages={this.loadImages} />}
        </ul>
        {this.state.showModal && (
          <div onClick={this.handleOverlayClick}>
            <Modal selectedImage={this.state.selectedImage} />
          </div>
        )}
      </>
    );
  }
}
