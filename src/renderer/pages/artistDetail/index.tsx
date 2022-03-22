import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { fetchSingerAlbum, fetchSingerDetail, fetchSingerTopSongs } from 'renderer/api';
import MusicTable from 'renderer/components/MusicTable';
import Scroll from 'renderer/components/scrollbar';
import styles from './index.module.scss';
import { Tabs, TabItem } from '../../components/Tabs/TabNav';
import PlaylistLoader from 'renderer/components/Loader/PlaylistLoader';
import Button from '../../components/Button';
import AlbumList from 'renderer/components/AlbumList';
// import HeaderButton from 'renderer/components/headerButton';

const ArtistDetailPage = () => {
  const { id } = useParams<any>();
  const detailResult = useQuery(['singerDetail', id], () => fetchSingerDetail(id));
  const detailData = detailResult.data?.data;
  // console.log(detailData)
  const topSongsResult = useQuery(['singerTopSongs', id], () => fetchSingerTopSongs(id));
  const topSongsData = topSongsResult.data;
  // console.log(topSongsData);
  const topSongsDataSource = topSongsData?.songs.map((song: any) => {
    return {
      name: song.name,
      id: song.id,
      artists: song.ar,
      duration: song.dt,
      album: song.al,
      alias: song.alia,
    };
  })
  const albumResult = useQuery(['singerAlbum', id], () => fetchSingerAlbum(id));
  const albumData = albumResult.data;
  const albumDataSource = albumData?.hotAlbums.map((album: any) => {
    return {
      id: album.id,
      name: album.name,
      picUrl: album.picUrl
    }
  })
  const loading = detailResult.isLoading && topSongsResult.isLoading && albumResult.isLoading;

  return (
    loading ? <PlaylistLoader/>
    :<Scroll>
    <div className={styles.artistDetailPage}>
      <div className={styles.pageHeader}>
        <div className={styles.singerCover}>
          <img src={detailData.artist.cover} alt={detailData.artist.name} />
        </div>
        <div className={styles.singerInfo}>
          <div className={styles.singerName}>
            <h2>{detailData.artist.name}</h2>
          </div>
          {/* <div className={styles.singerSubInfo}>
            <p>歌曲数: {detailData.artist.musicSize}</p>
            <p>专辑数: {detailData.artist.albumSize}</p>
          </div> */}
          <div className={styles.singerTags}>
            <p>{detailData.artist.identities.join('、')}</p>
          </div>
          <div className={styles.btn}>
            <Button>关注</Button>
          </div>
        </div>
      </div>
      <div className={styles.pageMain}>
        <Tabs defaultActiveKey={'top'}>
          <TabItem key="top" tab='最热门歌曲'>
            <MusicTable
              dataSource={topSongsDataSource}
            />
          </TabItem>
          <TabItem key="album" tab="专辑">
            <AlbumList
              dataSource={albumDataSource}
            />
          </TabItem>
          <TabItem key="desc" tab='简介'>
            <p>{detailData.artist.briefDesc? detailData.artist.briefDesc.split('\n').map((item: string, index: number)=>(<p key={index}>{item}</p>)) : '暂无简介'}</p>
          </TabItem>
        </Tabs>
      </div>
    </div>
    </Scroll>
  )
}

export default ArtistDetailPage;

