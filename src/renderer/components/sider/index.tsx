import React from 'react';
import styles from './index.module.scss';
import Nav from '../nav/index';

const Sider: React.FC = () => {
  const img = require('../../assets/logo3.png');
  return (
    <div className={styles.sider}>
      <div className={styles.siderInner}>
        <div className={styles.logo}>
          <img src={img} alt="logo" />
        </div>
        <div className={styles.navList}>
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default Sider;
