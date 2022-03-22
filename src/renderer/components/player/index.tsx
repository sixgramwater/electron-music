import React from 'react';
import styles from './index.module.scss';
import {
  MdSkipPrevious,
  MdSkipNext,
  MdVolumeDown,
  MdOutlinePlayCircleFilled,
  MdOutlineQueueMusic,
} from 'react-icons/md';
import { useAppDispatch } from 'renderer/hooks/hooks';
import { useHistory } from 'react-router-dom';
// import Slider from 'rc-slider';

const Player: React.FC = () => {
  const albumCover =
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fbf19f7ffec9278ce7f92cd79c132db9945d87c57a10c-63iyrZ_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640440257&t=1113a3a43c3d8214798abcf346e4b58d';
  const dispatch = useAppDispatch();
  const history = useHistory();
  const handleClickPlayListIcon = () => {
    dispatch({
      type: 'app/toggleShowPlayList',
      payload: true,
    });
  };
  const handleClickAlbumCover = () => {
    history.push('/playing');
  };
  return (
    <div className={styles.player}>
      <div className={styles.playerInner}>
        <div className={styles.playerInfo}>
          <div className={styles.albumCover} onClick={handleClickAlbumCover}>
            <img src={albumCover} alt="albumCover" />
          </div>
          <div className={styles.albumInfo}>
            <div className={styles.albumTitle}>Red</div>
            <div className={styles.albumSinger}>Taylor Swift</div>
          </div>
        </div>
        <div className={styles.playerBtns}>
          <div className={styles.playerButton}>
            <MdSkipPrevious />
          </div>
          <div className={styles.playerButton}>
            <MdOutlinePlayCircleFilled
              style={{ fontSize: '40px', color: 'var(--primary-color)' }}
            />
          </div>
          <div className={styles.playerButton}>
            <MdSkipNext />
          </div>
          <div className={styles.playerButton}>
            <MdVolumeDown style={{ fontSize: '20px' }} />
          </div>
        </div>
        <div className={styles.playerList}>
          <div className={styles.playingTime}>
            <span>03:45 / 04:00</span>
          </div>
          <div
            className={styles.playListIcon}
            onClick={handleClickPlayListIcon}
          >
            <MdOutlineQueueMusic />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
