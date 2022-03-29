import React from 'react';
import styles from './index.module.scss';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { MdOutlinePlayArrow } from 'react-icons/md';
import Button from '../../components/Button';
import { fetchAlbumDetail } from 'renderer/api';
import Scroll from 'renderer/components/scrollbar';
import PlaylistLoader from 'renderer/components/Loader/PlaylistLoader';
import { TabItem, Tabs } from 'renderer/components/Tabs/TabNav';
import MusicTable from 'renderer/components/MusicTable';
import { useAppDispatch } from 'renderer/hooks/hooks';
import { parseDate } from 'renderer/utils';

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
  });
  const albumDetailInfo = albumDetailResult.data?.album;
  const loading = albumDetailResult.isLoading;
  const dispatch = useAppDispatch();
  const handleClickPlayAll = () => {
    if(albumDetailSongsDataSource.length === 0)  return;
    dispatch({
      type: 'music/setTrackPlaylist',
      payload: albumDetailSongsDataSource
    });

    dispatch({
      type: 'music/setCurMusic',
      payload: albumDetailSongsDataSource[0]
    });

    dispatch({
      type: 'music/setPlayingState',
      payload: 'playing'
    });
    dispatch({
      type: 'music/setDuration',
      payload: (albumDetailSongsDataSource[0].duration / 1000) >> 0,
    });
  }
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
          <div className={styles.info}>
            <div className={styles.artist}>
              {albumDetailInfo.artists.map((artist: any) => artist.name).join(' / ')}
            </div>
            <div className={styles.publishTime}>
              {parseDate(albumDetailInfo.publishTime)}
              {/* {albumDetailInfo.publishTime} */}
            </div>
          </div>
          <div className={styles.btn}>
            <Button onClick={handleClickPlayAll} prefix={<MdOutlinePlayArrow />}>播放全部</Button>
            {/* <div className={styles.button}  onClick={handleClickPlayAll}>
              <div className={styles.prefix}>
                <MdOutlinePlayArrow />
              </div>
              <span>播放全部</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className={styles.pageMain}>
        <Tabs defaultActiveKey="songs">
          <TabItem key="songs" tab='歌曲'>
            <MusicTable
              showButton={false}
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
