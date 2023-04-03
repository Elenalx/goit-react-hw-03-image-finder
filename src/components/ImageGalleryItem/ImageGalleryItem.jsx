import { Component } from 'react';
import css from './image-gallery-item.module.css';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
    state = {
        showModal: false,
    };

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    };
    
    render() {
        return (
            <li
                className={css.imageGalleryItem}
                key={this.props.id}
                onClick={this.toggleModal}
            >
                <img className={css.image} src={this.props.webformatURL} alt={this.props.tags} />
                {this.state.showModal && (
                    <Modal
                        onClose={this.toggleModal}
                        id={this.props.id}
                        tags={this.props.tags}
                        largeImageURL={this.props.largeImageURL}
                    />
                )}
            </li>
        );
    }
}
 




