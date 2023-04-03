import { Component } from 'react';
import Notiflix from 'notiflix';

import Searchbar from './Searchbar/Searchbar';

import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from'./Button/Button';
import Modal from './Modal/Modal';
import { galleryApi } from 'services/gallery-api';

// import css from './app.module.css';


export class App extends Component {
   state = {
    searchText: '',
    images: [],
    loading: false,
    data: null,
    page: 1,
     isModalOpen: false,
     currenPreview: '',
    totalImage: 0,
  };


  componentDidUpdate(_, prevState) {
    const { searchText, page } = this.state;
    if (
      prevState.searchText !== searchText ||
      prevState.page !== page
    ) {
      this.setState({ loading: true });
      
      galleryApi(this.state.searchText, this.state.page)
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
  this.setState({isModal:false})
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
    this.setState({ searchText, images: [], page: 1 });
  };


   render() {
      //  const { handleSearch } = this;
    const { loading, buttonTogle,isModal,currenPreview,img,totalImage } = this.state;
    return (
       <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: '#010101',
        backgroundColor: "rgb(231, 236, 242)",
      }}>
        <Searchbar handleSearch={this.handleSearch} />
       
        {img.length !== 0  && (<ImageGallery data={img} onImageClick={this.openModal}  />)}

        {loading && <Loader />}
        {img.length !== totalImage && buttonTogle && <Button onLoadMore={this.onLoadMore} />}
        { isModal && (
        <Modal onModalClose={this.modalClose}  image={currenPreview}/>
        )}
      </div>
    );
  }
}

export default App;
