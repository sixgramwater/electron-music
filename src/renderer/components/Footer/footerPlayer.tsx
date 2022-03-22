import React from 'react';
import styles from './index.module.scss';
import {
  MdSkipPrevious,
  MdSkipNext,
  MdVolumeDown,
  MdOutlinePlayCircleFilled,
  MdPauseCircleFilled,
  MdOutlineQueueMusic,
} from 'react-icons/md';
import { useAppDispatch, useAppSelector } from 'renderer/hooks/hooks';
import { FaRandom, FaIndent, FaSync } from 'react-icons/fa';
import VolumeBar from '../volumeBar';
// import { timeFormat } from 'renderer/utils';

// import { useAppSelector } from 'renderer/hooks/hooks';
// import { useHistory } from 'react-router-dom';
// import Slider from 'rc-slider';

const FooterPlayer: React.FC = () => {
  const albumCover =
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fbf19f7ffec9278ce7f92cd79c132db9945d87c57a10c-63iyrZ_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640440257&t=1113a3a43c3d8214798abcf346e4b58d';

  const dispatch = useAppDispatch();
  const curMusic = useAppSelector((state) => state.music.curMusic);
  const curTime = useAppSelector((state) => state.music.curTime);
  const duration = useAppSelector((state) => state.music.duration);
  const playMode = useAppSelector((state) => state.music.playMode);
  const playingState = useAppSelector((state) => state.music.playingState);
  const isPlaying = useAppSelector((state) => state.music.isPlaying);
  // const history = useHistory();
  const handleClickPlayListIcon = () => {
    dispatch({
      type: 'app/toggleShowPlayList',
      payload: true,
    });
  };
  const handleClickAlbumCover = () => {
    dispatch({
      type: 'app/toggleShowPlayingPage',
      payload: true,
    });
    // history.push('/playing');
  };
  const handleClickPlay = () => {
    dispatch({
      type: 'music/setPlayingState',
      payload: 'playing',
    });
  };
  const handleClickPause = () => {
    dispatch({
      type: 'music/setPlayingState',
      payload: 'paused',
    });
  };
  const handleClickStop = () => {
    dispatch({
      type: 'music/setPlayingState',
    });
  };
  const clickPlayModeButton = () => {
    const mode = ['随机播放','列表循环', '单曲循环'];
    // toast(mode[(playMode+1) % 3]);
    dispatch({
      type: 'app/setToastContent',
      payload: `${mode[(playMode+1) % 3]}`
    })
    dispatch({
      type: 'music/setPlayMode',
      payload: (playMode + 1) % 3,
    });
  };
  const renderPlayingModeButton = (state: number) => {
    switch (state) {
      case 0:
        return <FaRandom style={{ fontSize: '14px' }} />;
      case 1:
        return <FaIndent style={{ fontSize: '14px' }} />;
      case 2:
        return <FaSync style={{ fontSize: '14px' }} />;
      default:
        return <FaRandom style={{ fontSize: '14px' }} />;
    }
  };

  const timeFormat = (time: number) => {
    // let temp = time.toFixed(0);
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    const formatted = `${minutes.toFixed(0).padStart(2, '0')}:${seconds
      .toFixed(0)
      .padStart(2, '0')}`;
    return formatted;
  };
  return (
    <div className={styles.player}>
      <div className={styles.playerInner}>
        <div className={styles.playerInfo}>
          <div className={styles.albumCover} onClick={handleClickAlbumCover}>
            <img src={curMusic?.album.picUrl} alt="albumCover" />
          </div>
          <div className={styles.albumInfo}>
            <div className={styles.albumTitle}>{curMusic?.name}</div>
            <div className={styles.albumSinger}>
              {curMusic?.artists[0].name}
            </div>
          </div>
        </div>
        <div className={styles.playerBtns}>
          <div className={styles.playerButton} onClick={clickPlayModeButton}>
            {renderPlayingModeButton(playMode)}
          </div>
          <div className={styles.playerButton}>
            <MdSkipPrevious />
          </div>
          <div className={styles.playerButton}>
            {!isPlaying ? (
              <MdOutlinePlayCircleFilled
                style={{ fontSize: '40px', color: 'var(--primary-color)' }}
                onClick={handleClickPlay}
              />
            ) : (
              <MdPauseCircleFilled
                style={{ fontSize: '40px', color: 'var(--primary-color)' }}
                onClick={handleClickPause}
              />
            )}
          </div>
          <div className={styles.playerButton}>
            <MdSkipNext />
          </div>
          <div className={styles.playerButton}>
            <VolumeBar />
            {/* <MdVolumeDown style={{fontSize: '20px'}}/> */}
          </div>
        </div>
        <div className={styles.playerList}>
          <div className={styles.playingTime}>
            <span>
              {timeFormat(curTime)} / {timeFormat(duration)}
            </span>
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

export default FooterPlayer;
