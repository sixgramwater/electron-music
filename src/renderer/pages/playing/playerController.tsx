import React from 'react';
import styles from './index.module.scss';
import { FaRandom, FaIndent, FaSync } from 'react-icons/fa';
import { MdSkipPrevious, MdSkipNext, MdVolumeDown, MdOutlineDownload, MdOutlineComment ,MdOutlinePlayCircleFilled, MdPauseCircleFilled,MdOutlineQueueMusic} from 'react-icons/md';
// import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { IoHeartDislikeOutline, IoHeartOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from 'renderer/hooks/hooks';

const PlayerController: React.FC = () => {
  const dispatch = useAppDispatch();
  const curTime = useAppSelector(state=>state.music.curTime);
  const duration = useAppSelector(state=>state.music.duration);
  const isPlaying = useAppSelector(state=>state.music.isPlaying);
  const playMode = useAppSelector(state=>state.music.playMode);
  const timeFormat = (time: number) => {
    // let temp = time.toFixed(0);
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    const formatted = `${minutes.toFixed(0).padStart(2, '0')}:${seconds
      .toFixed(0)
      .padStart(2, '0')}`;
    return formatted;
  };
  const handleClickPlayListIcon = () => {
    dispatch({
      type: 'app/toggleShowPlayList',
      payload: true,
    })
  }

  const handleClickPlayBtn = () => {
    dispatch({
      type: 'music/setPlayingState',
      payload: 'playing'
    })
  }

  const handleClickPauseBtn = () => {
    dispatch({
      type: 'music/setPlayingState',
      payload: 'paused'
    })
  }
  const clickPlayModeButton = () => {
    dispatch({
      type: 'music/setPlayMode',
      payload: (playMode+1)%3,
    })
  }
  // type playModeType = 'random' | 'list' | 'single';
  const renderPlayingModeButton = (state: number) => {
    switch (state) {
      case 0:
        return (
          <FaRandom style={{fontSize: '14px'}} />
        )
      case 1:
        return(
          <FaIndent style={{fontSize: '14px'}} />
        )
      case 2:
        return (
          <FaSync style={{fontSize: '14px'}} />
        )
      default:
        return (
          <FaRandom style={{fontSize: '14px'}} />
        )
    }
  }

  return (
    // <div className={styles.playerController}>
    <div className={styles.controllerInner}>
      <div className={styles.miniButtons}>
        <div className={styles.miniButton}>
          <IoHeartOutline />
        </div>
        <div className={styles.miniButton}>
          <IoHeartDislikeOutline/>

        </div>
        <div className={styles.miniButton}>
          <MdOutlineDownload />
        </div>
        <div className={styles.miniButton}>
          <MdOutlineComment/>
        </div>

      </div>
      <div className={styles.playerBtns}>
        <div className={styles.playerButton} style={{marginRight: '3px'}} onClick={clickPlayModeButton}>
          {
            renderPlayingModeButton(playMode)
          }
        </div>
        <div className={styles.playerButton}>
          <MdSkipPrevious />
        </div>
        <div className={styles.playerButton}>
          {
            isPlaying ?
            <MdPauseCircleFilled style={{fontSize: '40px', color: '#1ece9a'}} onClick={handleClickPauseBtn}></MdPauseCircleFilled>
            : <MdOutlinePlayCircleFilled style={{fontSize: '40px', color: '#1ece9a'}} onClick={handleClickPlayBtn}/>

          }
        </div>
        <div className={styles.playerButton}>
          <MdSkipNext />
        </div>
        <div className={styles.playerButton}>
          <MdVolumeDown style={{fontSize: '20px'}} />
        </div>
      </div>
      <div className={styles.rightBtns}>
        <div className={styles.timeInfo}>
          <span>{timeFormat(curTime)}/{timeFormat(duration)}</span>
        </div>
        <div className={styles.playListIcon} onClick={handleClickPlayListIcon}>
          <MdOutlineQueueMusic />
        </div>
      </div>
    </div>
    // </div>
  )
}

export default PlayerController;
