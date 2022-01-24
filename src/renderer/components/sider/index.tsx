import React from 'react';
import styles from './index.module.scss';
import Nav from '../nav/index';

const Sider: React.FC = () => {
  return (
    <div className={styles.sider}>
      <div className={styles.siderInner}>
        <div className={styles.logo}>
          <img src={'logo3.png'} alt="logo" />
        </div>
        <div className={styles.navList}>
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default Sider;
