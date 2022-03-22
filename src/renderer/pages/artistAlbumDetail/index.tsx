import React from 'react';
import styles from './index.module.scss';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import Button from '../../components/Button';
import { fetchAlbumDetail } from 'renderer/api';
import Scroll from 'renderer/components/scrollbar';
import PlaylistLoader from 'renderer/components/Loader/PlaylistLoader';
import { TabItem, Tabs } from 'renderer/components/Tabs/TabNav';
import MusicTable from 'renderer/components/MusicTable';

const ArtistAlbumDetailPage = () => {
  const { id } = useParams<any>();
  const albumDetailResult = useQuery(['albumDetail', id], () => fetchAlbumDetail(id));
  const albumDetailSongs = albumDetailResult.data?.songs;
  const albumDetailSongsDataSource = albumDetailSongs?.map((song: any) => {
    return {
      name: song.name,
      id: song.id,
      artists: song.ar,
      duration: song.dt,
      album: song.al,
      alias: song.alia,
    }
  })
  const albumDetailInfo = albumDetailResult.data?.album;
  const loading = albumDetailResult.isLoading;
  return (
    loading ? <PlaylistLoader/>
    :<Scroll>
    <div className={styles.albumDetailPage}>
      <div className={styles.pageHeader}>
        <div className={styles.albumCover}>
          <img src={albumDetailInfo?.picUrl} alt="cover" />
        </div>
        <div className={styles.albumInfo}>
          <div className={styles.albumName}>
            <h2>{albumDetailInfo?.name}</h2>
          </div>
          {/* <div className={styles.btn}>
            <Button prefix={}>播放全部</Button>
          </div> */}
        </div>
      </div>
      <div className={styles.pageMain}>
        <Tabs defaultActiveKey="songs">
          <TabItem key="songs" tab='歌曲'>
            <MusicTable
              dataSource={albumDetailSongsDataSource}
            />
          </TabItem>
          <TabItem key="desc" tab='简介'>
            {
              albumDetailInfo?.description?.split('\n').map((item:string, index: number) => (
                <p key={index}>{item}</p>
              ))
            }
          </TabItem>
        </Tabs>
      </div>
    </div>
    </Scroll>
  )
}

export default ArtistAlbumDetailPage;
