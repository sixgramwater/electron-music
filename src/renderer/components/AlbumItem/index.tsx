import React from 'react';
import styles from './index.module.scss';
import { MdOutlinePlayCircleFilled } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
// import { PlaylistType } from 'renderer/store/musicSlice';

// export interface AlbumItemProps {
//   id: number;
//   name: string;
//   songs:
// }

export interface AlbumItemProps {
  id: number;
  name: string;
  picUrl: string;
}

const AlbumItem: React.FC<AlbumItemProps> = (props) => {
  const {
    id,
    name,
    picUrl
  } = props;
  const albumCover = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fbf19f7ffec9278ce7f92cd79c132db9945d87c57a10c-63iyrZ_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640440257&t=1113a3a43c3d8214798abcf346e4b58d'
  const history = useHistory();
  const handleClickAlbum = () => {
    history.push('/albumDetail/'+id);
  }
  return (
    <div className={styles.albumItem} onClick={handleClickAlbum}>
      <div className={styles.albumCover}>
        <div className={styles.albumCoverImg}>
          <img src={picUrl} alt="cover" />
        </div>
        <div className={styles.albumCoverMask}>
          <MdOutlinePlayCircleFilled/>
        </div>
      </div>
      <div className={styles.albumName}>
        <span>{name}</span>
      </div>
    </div>
  )
}

export default AlbumItem;
