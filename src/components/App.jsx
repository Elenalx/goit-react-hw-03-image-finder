import { Component } from 'react';
import Notiflix from 'notiflix';

import Searchbar from './Searchbar/Searchbar';

import Loader from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { galleryApi } from 'services/gallery-api';

import css from './app-module.css';


export class App extends Component {
   state = {
    searchText: '',
    img: [],
    loading: false,
    data: null,
    page: 1,
    isModalOpen: false,
    currenPreview: '',
     totalImage: 0,
    buttonTogle: false,
  };


  componentDidUpdate(_, prevState) {
    const { searchText, page } = this.state;
    if (
      prevState.searchText !== searchText ||
      prevState.page !== page
    ) {
      this.setState({ loading: true });
      
      galleryApi(searchText, page)
        .then(response => response.json())
        .then(data => {
        if (!data.total) {
           Notiflix.Notify.failure(
              'Sorry, but nothing was found for your search'
            );
        }
        
      const hits = data.hits;
      this.buttonTogle(hits.length);
          
          
      this.setState(prevState => ({
        img: [...prevState.img , ...data.hits ],
        totalImage:data.total,
          }));

          console.log(this.state.img);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }
    
  openModal = url => {
    this.setState({ currenPreview: url,
    isModal:true,
    });
  };

modalClose = () => {
  this.setState({isModalOpen:false})
}


  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  buttonTogle = length => {
    if (length >= 12) {
      return this.setState({ buttonTogle: true });
    }
    return this.setState({ buttonTogle: false });
  };

   handleSearch = searchText => {
    this.setState({ searchText, img: [], page: 1 });
  };


   render() {
       const { handleSearch } = this;
       const { loading, buttonTogle,isModalOpen,currenPreview,img,totalImage } = this.state;
    return (
      <div classname={css.app} 
      >
        <Searchbar handleSearch={handleSearch} />
       
        {img.length !== 0  && (<ImageGallery data={img} onImageClick={this.openModal}  />)}

        {loading && <Loader />}
        {img.length !== totalImage && buttonTogle && <Button onClick={this.onLoadMore} />}
        { isModalOpen && (
        <Modal onModalClose={this.modalClose}  img={currenPreview}/>
        )}
      </div>
    );
  }
}
export default App;