import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';

import Loader from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
// import { Modal } from './Modal/Modal';
import { galleryApi } from 'services/gallery-api';

import css from './app-module.css';


 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


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


  async componentDidUpdate(_, prevState) {
    const { searchText, page } = this.state;
    if (
      prevState.searchText !== searchText ||
      prevState.page !== page
    ) {
      this.setState({ loading: true });


      try {
        this.setState({ loading: true });
        const img = await galleryApi(searchText, page);
        console.log(img.totalHits)

        if(img.hits.length === 0 ){
          this.setState({img: [],})
          toast.warning(
            'No results were found for your search, please try something else.'
          );
          return
        }
        
        if(this.state.page === 1 && img.totalHits !== 0 ){
          toast.success(`Hooray! We found ${img.totalHits} images.`);

        }

        this.setState(state => ({
          img: [...state.img, ...img.img],
          totalImage: img.hits.length,
       }));

       if(page > img.totalHits / 12){
        toast.info(
          'Were sorry, but you have reached the end of search results.'
        );
       }

      } catch (error) {
        this.setState({ error });
        toast.error(`Whoops, something went wrong: ${error.message}`);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  formSubmit = inputValue => {
    this.setState({ inputValue: inputValue, page: 1, img: [] });
  };
  onLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1, loading: true }));
  };

  render() {
    const { img, loading, totalImage } = this.state;
    return (
      <>
        <div className={css.app}>
          <Searchbar onSubmit={this.formSubmit} />
         
          { img.length > 0 && <ImageGallery items={img} />}
           {loading && <Loader />}
          {totalImage >=12 && <Button onClick={this.onLoadMoreClick} />}
          <ToastContainer autoClose={3000} theme="colored" pauseOnHover/>
        </div>
      </>
    );
  }
}
      
//       galleryApi(searchText, page)
//         .then(response => response.json())
//         .then(data => {
//         if (!data.total) {
//            Notiflix.Notify.failure(
//               'Sorry, but nothing was found for your search'
//             );
//         }
        
//       const hits = data.hits;
//       this.buttonTogle(hits.length);
          
          
//       this.setState(prevState => ({
//         img: [...prevState.img , ...data.hits ],
//         totalImage:data.total,
//           }));

//           console.log(this.state.img);
//         })
//         .catch(error => {
//           console.log(error);
//         })
//         .finally(() => {
//           this.setState({ loading: false });
//         });
//     }
//   }
    
//   openModal = url => {
//     this.setState({ currenPreview: url,
//     isModal:true,
//     });
//   };

// modalClose = () => {
//   this.setState({isModalOpen:false})
// }


//   onLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   buttonTogle = length => {
//     if (length >= 12) {
//       return this.setState({ buttonTogle: true });
//     }
//     return this.setState({ buttonTogle: false });
//   };

//    handleSearch = searchText => {
//     this.setState({ searchText, img: [], page: 1 });
//   };


//    render() {
//        const { handleSearch } = this;
//        const { loading, buttonTogle,isModalOpen,currenPreview,img,totalImage } = this.state;
//     return (
//       <div classname={css.app} 
//       >
//         <Searchbar handleSearch={handleSearch} />
       
//         {img.length !== 0  && (<ImageGallery data={img} onImageClick={this.openModal}  />)}

//         {loading && <Loader />}
//         {img.length !== totalImage && buttonTogle && <Button onClick={this.onLoadMore} />}
//         { isModalOpen && (
//         <Modal onModalClose={this.modalClose}  img={currenPreview}/>
//         )}
//       </div>
//     );
//   }
// }
// export default App;