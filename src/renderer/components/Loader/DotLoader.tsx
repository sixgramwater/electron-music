import React from 'react';
import styles from './index.module.scss';

interface DotLoaderProps {
  size?: string;
  height?: string;
}

const DotLoader: React.FC<DotLoaderProps> = (props) => {
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
        <div className={styles['dot-pulse']}></div>
      </div>
    </div>
  );
};

export default DotLoader;
