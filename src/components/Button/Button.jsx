import PropTypes from 'prop-types';
import styles from './button.module.css';

const Button = ({ title, onClick }) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};