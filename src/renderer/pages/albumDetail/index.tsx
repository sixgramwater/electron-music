import React, {useEffect} from 'react';
import styles from './index.module.scss';
import { MdOutlinePlayArrow, MdOutlineAddBox, MdOutlineDownload, MdOutlineHighQuality } from 'react-icons/md';
import { Row, Col } from 'antd';
import { FaRegHeart } from 'react-icons/fa';
import { useAppSelector } from 'renderer/hooks/hooks';
import { useParams } from 'react-router';
import PlaylistLoader from 'renderer/components/Loader/PlaylistLoader';
// import { MdOutlinePlayArrow } from 'react-icons/md';
// import AlbumItem from 'renderer/components/AlbumItem';

const AlbumDetailPage: React.FC = () => {
  const id = useParams();
  // useEffect(()=>{
  //   if()
  // }, [])
  const playlistLoading = useAppSelector(state=>state.music.playlistLoading);
  // const curPlaylist = useAppSelector(state=>state.music.)
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
  const handleClickPanelPlay = () => {

  }
  const handleClickPanelDownload = () => {

  }

  const renderMusicItem = () => {
    const playlistId = useParams();
    useEffect(() => {

    }, [])
    return(
      <Row>
        <div className={styles.musicItem}>
          <Col span={11}>
            <div className={styles.musicItemTitle}>
              <i className={styles.icon} onClick={handleClickLike}>
                <FaRegHeart />
              </i>
              <span>Love Story</span>
              <i className={styles.badge}>
                <MdOutlineHighQuality />
              </i>
              <div className={styles.panel}>
                <i className={styles.panelIcon} onClick={handleClickPanelPlay}><MdOutlinePlayArrow /></i>
                <i className={styles.panelIcon} onClick={handleClickPanelAdd}><MdOutlineAddBox /></i>
                <i className={styles.panelIcon} onClick={handleClickPanelDownload}><MdOutlineDownload /></i>
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
    )
  }
  return (
    playlistLoading ? <PlaylistLoader/> :
    <div className={styles.albumDetailPage}>
      <div className={styles.detailHeader}>
        <div className={styles.albumCover}>
          <img src={albumCover} alt="cover" />
        </div>
        <div className={styles.detailInfo}>
          <div className={styles.detailTitle}>
            <h1>每日30首</h1>
          </div>
          <div className={styles.detailDesc}>
            <div className={styles.author}>
              <div className={styles.albumAvatar}>
                {/* <img src="" alt="avatar" /> */}
              </div>
              <span>官方歌单</span>
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
          {
            renderMusicItem()
          }
        </div>
      </div>
    </div>
  )
}

export default AlbumDetailPage;
