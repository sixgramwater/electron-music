import React, { ReactNode } from 'react';
import styles from './index.module.scss';
import { Row, Col } from 'antd';
import { FaRegHeart } from 'react-icons/fa';
import {
  MdOutlinePlayArrow,
  MdOutlineAddBox,
  MdOutlineDownload,
  MdOutlineHighQuality,
} from 'react-icons/md';
import { useAppDispatch, useAppSelector } from 'renderer/hooks/hooks';
import { fetchMusicUrl } from 'renderer/api';
// import { fetchMusicUrl } from 'renderer/store/musicSlice';

export interface MusicTableProps {
  dataSource: Object[];
  columns?: ColumnsType[];
  // columns: ColumnsType[];
}

export interface ColumnsType {
  className?: string;
  flex?: string;
  colSpan?: number;
  dataIndex: string;
  width?: string | number;
  title: string;
  key: string;
  render?: (text: any, record: any, index: number) => ReactNode;
  onClick?: (value: any) => void;
}

const MusicTable: React.FC<MusicTableProps> = (props) => {
  const { dataSource, columns } = props;
  const dispatch = useAppDispatch();

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

  const handleClickPlayAll = () => {};
  const handleClickSinger = () => {};

  const handleClickAlbum = () => {};

  const handleClickLike = () => {};

  const handleClickPanelAdd = () => {};
  const handleClickPanelPlay = (para: MusicItemType) => {
    dispatch({
      type: 'music/setCurMusic',
      payload: para,
    });

    dispatch({
      type: 'music/setDuration',
      payload: (para.duration / 1000) >> 0,
    });
  };
  const handleClickPanelDownload = (para: any) => {
    const id: number = para.id;
    fetchMusicUrl(id).then(res=>{
      const url = res.data.data[0].url;
      console.log('fetched url: ', url);
      if(!url)  return;
      window.electron.ipcRenderer.send('trigger-download', url);
      dispatch({
        type: 'app/beforeAddDownloadItem',
        payload: {
          musicItem: para,
          url
        }
      })
    })
  };

  const timeFormat = (time: number) => {
    // let temp = time.toFixed(0);
    time = (time / 1000) >> 0;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    const formatted = `${minutes.toFixed(0).padStart(2, '0')}:${seconds
      .toFixed(0)
      .padStart(2, '0')}`;
    return formatted;
  };
  const customeRenderTableItem = (para: any, index: number) => {
    // if(!para)  return;
    // const {  } = para;
    return (
    <Row key={para.id? para.id : index}>
      <div className={styles.musicItem}>
        {
          columns!.map((col, index) => {
            const colValue = para[col.dataIndex];
            if(col.render) {
              return (
                <Col key={col.key} flex={col.flex} span={col.colSpan}>
                  {
                    col.render(colValue, para, index)
                  }
                </Col>
              )
            } 
            return (
            <Col key={col.key} flex={col.flex} span={col.colSpan}>
              <div className={styles.itemTitle}
              >
                <span>{colValue}</span>
              </div>
            </Col>
            )
          })
        }
      </div>
    </Row>
    )
  }
  const renderTableItem = (para: MusicItemType) => {
    if (!para) return;
    const {
      name = 'default title',
      id,
      artists,
      duration,
      album,
      alias,
    } = para;
    return (
      <Row key={id}>
        <div className={styles.musicItem}>
          <Col span={11}>
            <div className={styles.musicItemTitle}>
              <i className={styles.icon} onClick={handleClickLike}>
                <FaRegHeart />
              </i>
              <span className={styles.title}>{name}</span>
              {alias?.length !== 0 && (
                <span className={styles.alias}>{'(' + alias[0] + ')'}</span>
              )}

              <i className={styles.badge}>
                <MdOutlineHighQuality />
              </i>
              <div className={styles.panel}>
                <i
                  className={styles.panelIcon}
                  onClick={() => handleClickPanelPlay(para)}
                >
                  <MdOutlinePlayArrow />
                </i>
                <i className={styles.panelIcon} onClick={handleClickPanelAdd}>
                  <MdOutlineAddBox />
                </i>
                <i
                  className={styles.panelIcon}
                  onClick={() => handleClickPanelDownload(para)}
                >
                  <MdOutlineDownload />
                </i>
              </div>
            </div>
          </Col>
          <Col flex="1 0 0%" style={{ overflow: 'hidden' }}>
            <div className={styles.itemTitle}>
              <span onClick={handleClickSinger}>
                {artists?.map((at) => at.name).join(' / ')}
              </span>
            </div>
          </Col>
          <Col flex="1 0 0%" style={{ overflow: 'hidden' }}>
            <div className={styles.itemTitle}>
              <span onClick={handleClickAlbum}>{album?.name}</span>
            </div>
          </Col>
          <Col flex="60px">
            <div className={styles.itemTitle}>
              <span>{timeFormat(duration)}</span>
            </div>
          </Col>
        </div>
      </Row>
    );
  };
  return (
    <div className={styles.musicTable}>
      <div className={styles.toolbar}>
        <div className={styles.detailButton}>
          <div className={styles.button}>
            <div className={styles.prefix}>
              <MdOutlinePlayArrow />
            </div>
            <span onClick={handleClickPlayAll}>播放全部</span>
          </div>
        </div>
      </div>
      <div className={styles.tableContent}>
        {
          columns ? 
          <Row
            style={{
              color: '#7d7d7d',
              fontSize: '13px',
            }}
          >
            {
              columns.map(col => {
                return (
                  <Col key={col.key} flex={col.flex} span={col.colSpan}>{col.title}</Col>
                )
              })
            }

          </Row>
          :
          <Row
            style={{
              color: '#7d7d7d',
              fontSize: '13px',
            }}
          >
            <Col span={11}>歌曲</Col>
            <Col flex="1">歌手</Col>
            <Col flex="1">专辑</Col>
            <Col flex="60px">
              <span>时长</span>
            </Col>
          </Row>
        }
        
        {dataSource ? (
          dataSource.map((item: any, index: number) => {
            if(!columns)  return renderTableItem(item);
            else return customeRenderTableItem(item, index);
          })
        ) : (
          <h2>no data</h2>
        )}
      </div>
    </div>
  );
};

export default MusicTable;
