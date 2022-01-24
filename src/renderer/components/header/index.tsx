import React from 'react';
import styles from './index.module.scss';
import HeaderButton from '../headerButton';
import {
  VscSettingsGear,
  VscJersey,
  VscChevronLeft,
  VscChevronRight,
} from 'react-icons/vsc';
import SearchBar from '../searchbar';
import { useHistory } from 'react-router-dom';
import { createLoginWindow, createNewWindow } from 'renderer/api/ipc';
const Header: React.FC = () => {
  const avatar =
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20181019%2F2bb900d12d894574868e599bb9323293.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640436280&t=25b30bfceb643c23e1317d53a2ed6191';
  const history = useHistory();
  const handleClickBackward = () => {
    history.go(-1);
  };

  const handleClickForward = () => {
    history.go(-1);
  };

  const handleClickAvatar = () => {
    // createLoginWindow();
    createNewWindow({
      width: 400,
      height: 600,
      minHeight: 300,
      minWidth: 200,
      hash: 'login',
    });
  };

  const handleSearch = (query: string) => {
    history.push('/search/' + encodeURI(query));
  };
  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerBtns}>
          <div className={styles.headerBtn} onClick={handleClickBackward}>
            <VscChevronLeft />
          </div>
          <div className={styles.headerBtn} onClick={handleClickForward}>
            <VscChevronRight />
          </div>
        </div>
        <SearchBar onSearch={handleSearch} />
        <div className={styles.headerAvatar}>
          <img src={avatar} alt="avatar" />
        </div>
        <div className={styles.userName}>
          <span>Quin33</span>
        </div>
        {/* <div className={styles.headerBtn}></div> */}
        <div className={styles.headerBtn} onClick={handleClickAvatar}>
          <VscJersey />
        </div>
        <div className={styles.headerBtn}>
          <VscSettingsGear style={{ fontSize: '16px' }} />
        </div>
        <div className={styles.divider}>|</div>
        <HeaderButton />
      </div>
    </div>
  );
};

export default Header;
