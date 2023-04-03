
import { Audio } from 'react-loader-spinner';

const Loader = () => {
    return (
      <div style={{margin: 'auto'}}>
    <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle
        />
        </div>
  );
};

export default Loader;

