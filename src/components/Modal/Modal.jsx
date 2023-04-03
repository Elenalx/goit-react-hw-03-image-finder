import { Component } from 'react';

import PropTypes from 'prop-types';
import css from './modal.module.css';


export class Modal extends Component {
  
  componentDidMount() {
    window.addEventListener('keydown', this.keyClose);
  }

  componentWillUnmount() {
    window.addEventListener('keydown', this.keyClose);
  }
  keyClose = e => {
    if (e.code === 'Escape') {
      this.props.onModalClose();
    }
  };
  hendleBackdropClick = event => {
    if ( event.currentTarget === event.target){
        this.props.onModalClose()
    }

  }

  render() {
    return (
      <div className={css.overlay} onClick={this.hendleBackdropClick}>
        <div className={css.modal} id={this.props.id}>
          <img src={this.props.largeImageURL } alt={this.props.tags} />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
    id: PropTypes.number,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onModalClose: PropTypes.func
}