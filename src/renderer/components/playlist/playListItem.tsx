import React from 'react';
import styles from './index.module.scss';
// import cx from 'classnames';

const PlayListItem: React.FC = () => {
  
  return (
    <div className={styles.playListItem}>
      <div className={styles.playListItemInner}>
        <div className={styles.title}>Senorita</div>
        <div className={styles.info}>
          <span className={styles.singer}>Shawn Mendes/ Camila Cabello</span>
          <span className={styles.musicLength}>04:39</span>
        </div>
      </div>
      <div className={styles.playListIcons}></div>
    </div>
  )
}

export default PlayListItem;