import React from 'react';
import styles from './index.module.scss';
import { Col, Row } from 'antd';
import { MdOutlineMusicVideo } from 'react-icons/md';
// import { FaRegHeart, FaMusic } from 'react-icons/fa';
import {
  MdOutlinePlayArrow,
  MdOutlineAddBox,
  MdOutlineDownload,
  MdOutlineHighQuality,
} from 'react-icons/md';
import { useAppDispatch, useAppSelector } from 'renderer/hooks/hooks';

type downloadType = "progressing" | "completed" | "cancelled" | "interrupted";

type ArtistType = {
  name: string;
  id: number;
};

type MusicItemType = {
  name: string;
  id: number;
  artists: ArtistType[];
  album: {
    name: string;
    id: number;
  };
  duration: number;
  alias: string[];
};

interface DownloadItemProps {
  fileName: string;
  savePath: string;
  totalBytes: number;
  receivedBytes: number;
  paused: boolean;
  // percent: number;
  downloadPath: string;
  state: downloadType;
  startTime: number;
  url: string;
  musicItem?: MusicItemType;
}

const DownloadItem: React.FC<DownloadItemProps> = (props) => {
  const { 
    fileName,
    savePath,
    totalBytes,
    receivedBytes,
    paused,
    downloadPath,
    state,
    startTime,
    url,
    musicItem,
  } = props;
  const handleClickLike = (id: number) => {

  }

  const handleClickPanelPlay = (para: MusicItemType) => {

  }

  const handleClickPanelAdd = (para: MusicItemType) => {

  }

  const handleClickPanelDownload = (id: number) => {

  }
  
  const handleClickSinger = () => {

  }

  const handleClickAlbum = (id: number) => {

  }
  
  const getPercent = (rec: number, total: number) => {
    let per = rec / total;
    return per.toFixed(2)+'%';
  }

  const formatBytes = (bytes: number) => {
    let mb = bytes/1024/1024;
    return mb.toFixed(1)+'M';
  }
  // const handleClick
  return (
    <div className={styles.downloadItem}>
      <div className={styles.itemInner}>
        {/* <span>{savePath}</span>:
        <span>{getPercent(receivedBytes, totalBytes)}</span>
        <span>{state}</span> */}
        <Row>
          <Col span={11}>
            <div className={styles.musicItemTitle}>
              <i className={styles.icon}>
                <MdOutlineMusicVideo />
              </i>
              <span className={styles.title}>
                {musicItem? musicItem.name : 'Not Recognized Music'}
              </span>
              {musicItem?.alias?.length !== 0 && (
                <span className={styles.alias}>{'(' + musicItem?.alias[0] + ')'}</span>
              )}
            </div>
          </Col>
          <Col flex="1 0 0%" style={{ overflow: 'hidden' }}>
            <div className={styles.itemTitle}>
              <span onClick={handleClickSinger}>
                {musicItem?.artists?.map((at) => at.name).join(' / ')}
              </span>
            </div>
          </Col>
          <Col flex="1 0 0%" style={{ overflow: 'hidden' }}>
            <div className={styles.progress}>
              <span>
              { getPercent(receivedBytes, totalBytes) }
              </span>
            </div>
          </Col>
          <Col flex="60px">
            <div className={styles.itemTitle}>
              <span>{}</span>
            </div>
          </Col>
        </Row>
        {/* <Row>
        <Col span={11}>
            <div className={styles.musicItemTitle}>
              <i className={styles.icon} onClick={()=>handleClickLike(musicItem.id)}>
                <FaRegHeart />
              </i>
              <span className={styles.title}>{musicItem.name}</span>
              {musicItem.alias?.length !== 0 && (
                <span className={styles.alias}>{'(' + musicItem.alias[0] + ')'}</span>
              )}

              <i className={styles.badge}>
                <MdOutlineHighQuality />
              </i>-
              <div className={styles.panel}>
                <i
                  className={styles.panelIcon}
                  onClick={() => handleClickPanelPlay(musicItem)}
                >
                  <MdOutlinePlayArrow />
                </i>
                <i className={styles.panelIcon} onClick={()=>handleClickPanelAdd(musicItem)}>
                  <MdOutlineAddBox />
                </i>
                <i
                  className={styles.panelIcon}
                  onClick={()=>handleClickPanelDownload(musicItem.id)}
                >
                  <MdOutlineDownload />
                </i>
              </div>
            </div>
          </Col>
          <Col flex="1 0 0%" style={{ overflow: 'hidden' }}>
            <div className={styles.itemTitle}>
              <span onClick={handleClickSinger}>
                {musicItem.artists?.map((at) => at.name).join(' / ')}
              </span>
            </div>
          </Col>
          <Col flex="1 0 0%" style={{ overflow: 'hidden' }}>
            <div className={styles.itemTitle}>
            </div>
          </Col>
          <Col flex="60px">
            <div className={styles.itemTitle}>
              <span>{}</span>
            </div>
          </Col>
        </Row> */}
      </div>
      <div className={styles.percent}></div>
      {/* <span>{fileName}</span> */}
    </div>
  )
}

export default DownloadItem;