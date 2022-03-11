import React from 'react';
import styles from './index.module.scss';

export interface BannerItemProps {
  imgUrl: string;
}

const BannerItem: React.FC<BannerItemProps> = (props) => {
  const { imgUrl } = props;
  return (
    <div className={styles.bannerItem}>
      {/* <div className={styles.}></div> */}

      <img src={imgUrl} alt="banner" />
    </div>
  )
}

export default BannerItem;
