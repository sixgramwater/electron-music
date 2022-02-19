import React from 'react';
import styles from './index.module.scss';
import MusicTable, { ColumnsType } from 'renderer/components/MusicTable';
import { FaRegHeart } from 'react-icons/fa';
import {
  MdOutlinePlayArrow,
  MdOutlineAddBox,
  MdOutlineDownload,
  MdOutlineHighQuality,
} from 'react-icons/md';
import { useAppSelector } from 'renderer/hooks/hooks';


const Downloaded: React.FC = () => {
  const downloadList = useAppSelector(state => state.app.downloadList);
  const handleClickPanelDownload = (record: any) => {

  }

  const handleClickPanelAdd = (record: any) => {

  }

  const handleClickPanelPlay = (record: any) => {

  }

  const handleClickAlbum = () => {

  }

  // const handleClick
  const tableList = downloadList.filter(item=>item.state==='completed').map(item => {
    return {
      id: item.musicItem?.id,
      alias: item.musicItem?.alias,
      percent: item.receivedBytes/item.totalBytes,
      // percent: (item.receivedBytes/item.totalBytes*100).toFixed(2)+'%',
      size: (item.totalBytes/1024/1024).toFixed(1)+'M',
      name: item.musicItem?.name,
      artists: item.musicItem?.artists.map((at: any) => at.name).join(' / '),
      album: item.musicItem?.album,
    }
  });
  // console.log(tableList);
  // const i = downloadList[1]
  const columns: ColumnsType[] = [
    {
      title: '歌曲',
      key: 'name',
      dataIndex: 'name',
      colSpan: 11,
      render: (text, record) => {
        return (
          <div className={styles.musicItemTitle}>
            <i className={styles.icon}>
              <FaRegHeart size={16}/>
            </i>
            <span className={styles.title}>{text}</span>
            {
              record.alias?.length !== 0 && (
              <span className={styles.alias}>{'(' + record.alias[0] + ')'}</span>
            )}

            <i className={styles.badge}>
              <MdOutlineHighQuality />
            </i>
            <div className={styles.panel}>
                <i
                  className={styles.panelIcon}
                  onClick={() => handleClickPanelPlay(record)}
                >
                  <MdOutlinePlayArrow size={24}/>
                </i>
                <i className={styles.panelIcon} onClick={()=>handleClickPanelAdd(record)}>
                  <MdOutlineAddBox />
                </i>
                <i
                  className={styles.panelIcon}
                  onClick={() => handleClickPanelDownload(record)}
                >
                  <MdOutlineDownload />
                </i>
              </div>
          </div>
        )
      }
    }, 
    {
      title: '歌手',
      key: 'artists',
      dataIndex: 'artists',
      flex: '1 0 0%',
    },
    {
      title: '专辑',
      key: 'album',
      dataIndex: 'album',
      flex: '1 0 0%',
      render: (text) => {
        return (
          <span onClick={handleClickAlbum}>{text.name}</span>
        )
      }
    },
    {
      title: '大小',
      key: 'size',
      dataIndex: 'size',
      colSpan: 2,
    }
  ]
  return (
    <div className={styles.downloadingPage}>
      <MusicTable 
        dataSource={tableList}
        columns={columns}
      />
      
    </div>

  )
};

export default Downloaded;
