import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { MdOutlinePlayArrow, MdOutlineAddBox, MdOutlineDownload, MdOutlineHighQuality } from 'react-icons/md';
import { Row, Col } from 'antd';
import { FaRegHeart } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from 'renderer/hooks/hooks';
import { useParams } from 'react-router';
import PlaylistLoader from 'renderer/components/Loader/PlaylistLoader';
import { fetchPlaylistDetail } from 'renderer/api';
import Scroll from '../../components/scrollbar'
// import { MdOutlinePlayArrow } from 'react-icons/md';
// import AlbumItem from 'renderer/components/AlbumItem';

type AlbumDetailParaType = {
  id: string;
}

const AlbumDetailPage: React.FC = () => {
  const stringId = useParams<AlbumDetailParaType>().id;
  const id = parseInt(stringId);
  // console.log(id);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch()
  // const playlistLoading = useAppSelector(state=>state.music.playlistLoading);
  const curPlaylistIndex = useAppSelector(state=>state.music.playlists.findIndex(list=>list.id===id));
  const curPlaylist = useAppSelector(state=>(curPlaylistIndex!==-1) ? state.music.playlists[curPlaylistIndex]:undefined);

  useEffect(() => {
    if(curPlaylist)  return;
    setLoading(true);
    fetchPlaylistDetail(id).then(para=>{
      const datalist = para.data.playlist;
      // console.log(datalist);
      const payload = {
        id: datalist.id,
        name: datalist.name,
        picUrl: datalist.coverImgUrl,
        userId: datalist.userId,
        createTime: datalist.createTime,
        updateTime: datalist.updateTime,
        trackCount: datalist.trackCount,
        tracks: datalist.tracks.map((track: any)=>{
          return {
            name: track.name,
            id: track.id,
            artists: track.ar,
            album: track.al,
            duration: track.dt,
          }
        }),
        trackIds: datalist.trackIds,
        creator: {
          avatarUrl: datalist.creator.avatarUrl,
          nickname: datalist.creator.nickname,
          signature: datalist.creator.signature,
        }
      }
      // console.log(payload);
      setLoading(false);
      dispatch({
        type: 'music/addPlaylists',
        payload: {
          id: payload.id,
          playlist: payload,
        }
      });
      // console.log(curPlaylist);

    })
  }, [])
  const albumCover = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fbf19f7ffec9278ce7f92cd79c132db9945d87c57a10c-63iyrZ_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640440257&t=1113a3a43c3d8214798abcf346e4b58d';
  const handleClickPlayAll = () => {

  }
  const handleClickSinger = () => {

  }

  const handleClickAlbum = () => {

  }

  const handleClickLike = () => {

  }

  const handleClickPanelAdd = () => {

  }
  const handleClickPanelPlay = (para: MusicItemType) => {
    dispatch({
      type: 'music/setCurMusic',
      payload: para,
    });

    dispatch({
      type: 'music/setDuration',
      payload: para.duration/1000>>0
    });


  }
  const handleClickPanelDownload = () => {

  }

  type ArtistType = {
    name: string;
    id: number;
  }

  type MusicItemType = {
    name: string;
    id: number;
    artists: ArtistType[];
    album: {
      name: string;
      id: number;
    }
    duration: number;
  }

  const timeFormat = (time: number) => {
    // let temp = time.toFixed(0);
    time = time / 1000 >>0;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    const formatted = `${minutes.toFixed(0).padStart(2, '0')}:${seconds
      .toFixed(0)
      .padStart(2, '0')}`;
    return formatted;
  };
  const renderMusicItem = (para: MusicItemType)=> {
    const {
      name="default title",
      id,
      artists,
      duration,
      album
    } = para;
    return(
      <Row
      key={id}>
        <div className={styles.musicItem}>
          <Col span={11}>
            <div className={styles.musicItemTitle}>
              <i className={styles.icon} onClick={handleClickLike}>
                <FaRegHeart />
              </i>
              <span>{name}</span>
              <i className={styles.badge}>
                <MdOutlineHighQuality />
              </i>
              <div className={styles.panel}>
                <i className={styles.panelIcon} onClick={()=>handleClickPanelPlay(para)}><MdOutlinePlayArrow /></i>
                <i className={styles.panelIcon} onClick={handleClickPanelAdd}><MdOutlineAddBox /></i>
                <i className={styles.panelIcon} onClick={handleClickPanelDownload}><MdOutlineDownload /></i>
              </div>
            </div>

          </Col>
          <Col flex="1 0 0%" style={{overflow: 'hidden'}}>
            <div className={styles.itemTitle}>
              <span onClick={handleClickSinger}>
                {artists[0].name}
              </span>
            </div>

          </Col>
          <Col flex="1 0 0%" style={{overflow: 'hidden'}}>
            <div className={styles.itemTitle}>
              <span onClick={handleClickAlbum}>
                {album.name}
              </span>
            </div>

          </Col>
          <Col flex="60px">
            <div className={styles.itemTitle}>
              <span>{timeFormat(duration)}</span>
            </div>
          </Col>

        </div>
      </Row>
    )
  }
  return (
    loading ? <PlaylistLoader/> :
    <Scroll>
    <div className={styles.albumDetailPage}>
      <div className={styles.detailHeader}>
        <div className={styles.albumCover}>
          <img src={curPlaylist?curPlaylist.picUrl:albumCover} alt="cover" />
        </div>
        <div className={styles.detailInfo}>
          <div className={styles.detailTitle}>
            <h1>{curPlaylist?curPlaylist.name:'name'}</h1>
          </div>
          <div className={styles.detailDesc}>
            <div className={styles.author}>
              <div className={styles.albumAvatar}>
                <img src={curPlaylist?curPlaylist.creator.avatarUrl:''} alt="avatar" />
                {/* <img src="" alt="avatar" /> */}
              </div>
              <span>{curPlaylist?curPlaylist.creator.nickname:'creator'}</span>
            </div>
            <div className={styles.desc}>
            QQ音乐根据你的私人好品味为你挑选，每日更新。
            </div>

          </div>
          <div className={styles.detailButton}>
            <div className={styles.button}>
              <div className={styles.prefix}>
                <MdOutlinePlayArrow />
              </div>
              <span onClick={handleClickPlayAll}>播放全部</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.detailContent}>
        <div className={styles.musicTable}>
          <Row
            style={{
              color: '#7d7d7d',
              fontSize: '13px'
            }}
          >
            <Col span={11}>歌曲</Col>
            <Col flex="1">歌手</Col>
            <Col flex="1">专辑</Col>
            <Col flex="60px"><span>时长</span></Col>
          </Row>

          {
            curPlaylist ?
            curPlaylist.tracks.map((track:any)=>{
              return (
              renderMusicItem(track)
              )
            })
            :
            <Row>
            <div className={styles.musicItem}>
              <Col span={11}>
                <div className={styles.musicItemTitle}>
                  <i className={styles.icon} onClick={handleClickLike}>
                    <FaRegHeart />
                  </i>
                  <span>Love Story</span>
                  <div className={styles.panel}>
                    <i className={styles.panelIcon}><MdOutlinePlayArrow /></i>
                    <i className={styles.panelIcon}><MdOutlineAddBox /></i>
                    <i className={styles.panelIcon}><MdOutlineDownload /></i>
                  </div>
                </div>

              </Col>
              <Col flex="1">
                <span onClick={handleClickSinger}>
                  Tylar Swift
                </span>
              </Col>
              <Col flex="1">
                <span onClick={handleClickAlbum}>
                  Red
                </span>
              </Col>
              <Col flex="60px"><span>04:23</span></Col>

            </div>
          </Row>
          }
        </div>
      </div>
    </div>
    </Scroll>
  )
}

export default AlbumDetailPage;
