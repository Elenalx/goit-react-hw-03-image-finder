import { Component } from 'react';
import Notiflix from 'notiflix';

import Searchbar from './Searchbar/Searchbar';

import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { galleryApi } from 'services/gallery-api';

// import css from './app-module.css';

export class App extends Component {
  state = {
    searchText: '',
    page: 1,
    img: [],
    isLoading: false,
    buttonTogle: false,
    data: null,
    isModal: false,
    currenPreview: '',
    totalImage: 0,
  };

  fetchImages() {
    const { searchText, page } = this.state;
    galleryApi(searchText, page)
      .then(res => res.json())

      .then(data => {
        console.log(data);

        if (!data.total) {
          Notiflix.Notify.failure(
            'Sorry, but nothing was found for your search'
          );
          return;
        }
        const hits = data.hits;
        this.buttonTogle(hits.length);

        this.setState(prevState => {
          return {
            img: [...prevState.img, ...data.hits],
          };
        });
      })
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchText !== this.state.searchText ||
      this.state.page !== prevState.page
    ) {
      this.setState({ isLoading: true });

      this.fetchImages();
    }
  }

  openModal = url => {
    this.setState({ currenPreview: url, isModal: true });
  };

  modalClose = () => {
    this.setState({ isModal: false });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  buttonTogle = length => {
    if (length >= 12) {
      return this.setState({ buttonTogle: true });
    }
    return this.setState({ buttonTogle: false });
  };

  handleSearch = searchText => {
    this.setState({ searchText, img: [], pag: 1 });
  };

  render() {
    const { handleSearch } = this;
    const { isLoading, buttonTogle, isModal, currenPreview, img, totalImage } =
      this.state;
    return (
      <>
        <Searchbar handleSearch={handleSearch} />

        {img.length !== 0 && (
          <ImageGallery data={img} onImageClick={this.openModal} />
        )}

        {isLoading && <Loader />}
        {/* {img.length !== totalImage && buttonTogle && <Button onLoadMore={this.onLoadMore} />} */}
        {img.length !== totalImage && buttonTogle && (
          <Button onClick={this.onLoadMore} />
        )}
        {isModal && (
          <Modal onModalClose={this.modalClose} image={currenPreview} />
        )}
      </>
    );
  }
}