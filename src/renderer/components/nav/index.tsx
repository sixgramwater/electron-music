import React from 'react';
import styles from './index.module.scss';
import NavItem from './navItem';
import { FaStar, FaMusic, FaHeart, FaClock, FaDownload } from 'react-icons/fa';
import { MdDownload } from 'react-icons/md';

const NavList: React.FC = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.navInner}>
        <div className={styles.navTitle}>在线音乐</div>
        <div className={styles.navList}>
          <NavItem title="推荐" path="/" icon={<FaStar />} />
          <NavItem title="音乐库" path="/lib" icon={<FaMusic />} />
          <NavItem title="我喜欢" path="/like" icon={<FaHeart />} />
        </div>
        <div className={styles.navTitle}>本地音乐</div>
        <div className={styles.navList}>
          {/* <NavItem
            title="推荐"
            path="/"
            icon={ <FaStar/>}
          /> */}
          {/* <NavItem title="音乐库" path="/lib" icon={<FaMusic />} /> */}
          <NavItem title="最近播放" path="/recent" icon={<FaClock />} />
          <NavItem title="本地与下载" path="/download" icon={<FaDownload />} />
        </div>
      </div>
    </div>
  );
};

export default NavList;
