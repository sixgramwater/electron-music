import React from 'react';
import styles from './index.module.scss';
import { AlbumItemProps } from '../AlbumItem';
import AlbumItem from '../AlbumItem';

export interface AlbumListProps {
  dataSource: AlbumItemProps[];
}
const AlbumList: React.FC<AlbumListProps> = (props) => {
  const { dataSource } = props;
  return (
    <div className={styles.albumList}>
      {/* <div className={styles.container}> */}
        {
          dataSource.map((item) => (
            <div className={styles.albumContainer}>
              <AlbumItem
                {...item}
              />
            </div>
          ))
        }
      {/* </div> */}
    </div>
  )
}

export default AlbumList;
