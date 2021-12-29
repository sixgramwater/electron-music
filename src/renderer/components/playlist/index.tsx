import React from 'react';
import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from 'renderer/hooks/hooks';
import { MdOutlineQueueMusic } from 'react-icons/md';
import PlayListItem from './playListItem';
import cx from 'classnames';
// import PlaylistLoader from '../Loader/PlaylistLoader';

const PlayList: React.FC = () => {
  const dispatch = useAppDispatch();
  const showPlayList = useAppSelector(state => state.app.showPlayList);
  // const playlistLoading = useAppSelector(state=>state.music.playlistLoading);
  const handleClickMask = () => {
    dispatch({
      type: 'app/toggleShowPlayList',
      payload: false,
    })
  }

  const playListClass = cx(styles.playList, {
    [styles.show]: showPlayList,
  })

  const playListMaskClass = cx(styles.playListMask, {
    [styles.show]: showPlayList
  })
  return (
    <>
    <div className={playListClass}>
      <div className={styles.playListInner}>
        <div className={styles.playListHeader}>
          <div className={styles.headerInner}>
            <div className={styles.title}>播放队列</div>
            <div className={styles.count}>30首歌曲</div>
          </div>
        </div>
        <div className={styles.playListContent}>
          <PlayListItem />
        </div>
        <div className={styles.playListFooter}>
          <div className={styles.playListIcon} onClick={handleClickMask}>
            <MdOutlineQueueMusic/>
            <span>收起</span>
          </div>
        </div>
      </div>
    </div>
    <div className={playListMaskClass} onClick={handleClickMask}></div>
    </>
  )
}

export default PlayList;
