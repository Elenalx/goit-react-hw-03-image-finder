import PropTypes from 'prop-types';
import styles from './loader.module.css';

const Loader = ({visible}) => {
  return (
    <div className={`${styles.container} ${visible ? styles.visible : ""}`}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
};