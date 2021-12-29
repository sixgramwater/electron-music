import React from 'react';
import styles from './index.module.scss';
import { MdSkipPrevious, MdSkipNext, MdVolumeDown, MdOutlineDownload, MdOutlineComment ,MdOutlinePlayCircleFilled, MdOutlineQueueMusic} from 'react-icons/md';
// import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { IoHeartDislikeOutline, IoHeartOutline } from 'react-icons/io5';
import { useAppDispatch } from 'renderer/hooks/hooks';

const PlayerController: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleClickPlayListIcon = () => {
    dispatch({
      type: 'app/toggleShowPlayList',
      payload: true,
    })
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
        <div className={styles.playerButton}>
          <MdSkipPrevious />
        </div>
        <div className={styles.playerButton}>
          <MdOutlinePlayCircleFilled style={{fontSize: '40px', color: '#1ece9a'}}/>
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
          <span>01:32/03:31</span>
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
