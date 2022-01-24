import { AiOutlineLoading, AiOutlineLoading3Quarters } from 'react-icons/ai';
import styles from './index.module.scss';

interface SpinLoaderProps {
  size?: string;
  height?: string;
}

const SpinLoader: React.FC<SpinLoaderProps> = (props) => {
  const { size = '32px', height } = props;
  return (
    <div
      className={styles.loaderContainer}
      style={{
        height: height,
        fontSize: size,
      }}
    >
      {/* <div className={styles.co}></div> */}
      <div className={styles.loader}>
        <AiOutlineLoading3Quarters />
      </div>
    </div>
  );
};

export default SpinLoader;
