import React from 'react';
import styles from './index.module.scss';
import { MdOutlinePlayCircleFilled } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

type TrackType = {
  first: string;
  second: string;
}

export interface RanklistItemProps {
  id: number;
  name: string;
  picUrl: string;
  playCount?: number;
  tracks: TrackType[];

}

const RanklistItem: React.FC<RanklistItemProps> = (props) => {
  const { id, name, picUrl, playCount, tracks } = props;
  const ranklistCover =
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fbf19f7ffec9278ce7f92cd79c132db9945d87c57a10c-63iyrZ_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640440257&t=1113a3a43c3d8214798abcf346e4b58d';
  const history = useHistory();
  const handleClickRanklist = () => {
    history.push('/ranklistDetail/' + id);
  };
  return (
    <div className={styles.ranklistItem} onClick={handleClickRanklist}>
      <div className={styles.ranklistCover}>
        <div className={styles.ranklistCoverImg}>
          <img src={picUrl} alt="cover" />
        </div>
        <div className={styles.ranklistCoverMask}>
          <MdOutlinePlayCircleFilled />
        </div>
        <div className={styles.playCount}>
          <span>{playCount}</span>
        </div>
      </div>
      {/* <div className={styles.ranklistName}>
        <span>{name}</span>
      </div> */}
      <div className={styles.detailInfo}>
        <div className={styles.title}>
          <span>{name}</span>
        </div>
        <div className={styles.tracklist}>
          {
            tracks.map((track: any, index) => (
              <div className={styles.trackItem}>
                <div className={styles.index}>{index+1}</div>
                <div className={styles.trackInfo}>{track.first}-{track.second}</div>

              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default RanklistItem;
