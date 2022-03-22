import React from 'react';
import styles from './index.module.scss';
// import cx from 'classnames';
import { trackType } from 'renderer/store/playlistSlice';
import { timeFormat } from 'renderer/utils';
import cx from 'classnames';
import { useAppDispatch, useAppSelector } from 'renderer/hooks/hooks';

export type PlaylistItemProps = trackType;

const PlayListItem: React.FC<PlaylistItemProps> = (props) => {
  const {
    id,
    name,
    artists,
    duration,
    album
  } = props;
  const curMusic = useAppSelector(state => state.music.curMusic);
  const dispatch = useAppDispatch();
  const handleDBClick = () => {
    dispatch({
      type: 'music/setCurMusic',
      payload: {
        id,
        name,
        artists,
        duration,
        album
      }
    });
    dispatch({
      type: 'music/setPlayingState',
      payload: 'playing'
    })
    dispatch({
      type: 'music/setDuration',
      payload: (duration / 1000) >> 0,
    });
  }
  const playlistItemClass = cx(styles.playListItem, {
    [styles.active] : curMusic?.id === id
  })
  return (
    <div className={playlistItemClass} onDoubleClick={handleDBClick}>
      <div className={styles.playListItemInner}>
        <div className={styles.title}>{name}</div>
        <div className={styles.info}>
          <div className={styles.singerContainer}>
            <span className={styles.singer}>
              {artists.map((artist) => artist.name).join(' / ')}
            </span>
          </div>

          <span className={styles.musicLength}>{timeFormat(duration)}</span>
        </div>
      </div>
      <div className={styles.playListIcons}></div>
    </div>
  );
};

export default PlayListItem;
