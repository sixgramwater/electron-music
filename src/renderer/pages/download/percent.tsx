import React from 'react';
import styles from './index.module.scss';

interface PercentProps {
  value: number;
}

const Percent: React.FC<PercentProps> = (props) => {
  const { value } = props;
  return (
    <div className={styles.percentContainer}>
      <div className={styles.percentInner} style={{
        width: `${value*100}%`
      }}></div>
      <div className={styles.text}><span>{(value*100).toFixed(1)+'%'}</span></div>
    </div>
  )
}

export default Percent;