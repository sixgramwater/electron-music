import React from 'react';
import styles from './index.module.scss';
import MusicTable, { ColumnsType } from 'renderer/components/MusicTable';
import { FiMusic } from 'react-icons/fi';
// import { fetchRecentPlayedSongs } from 'renderer/api';
// import { useQuery } from 'react-query';
// import TableLoader from 'renderer/components/Loader/TableLoader';
import { useAppSelector } from 'renderer/hooks/hooks';
import Percent from './percent';
// import DownloadItem from './downloadItem';
// import { downloadItemType } from 'renderer/store/appSlice';
// import MusicTable from 'renderer/components/MusicTable';

const Downloading: React.FC = () => {
  const downloadList = useAppSelector(state => state.app.downloadList);
  const tableList = downloadList.map(item => {
    return {
      id: item.musicItem?.id,
      percent: item.receivedBytes/item.totalBytes,
      // percent: (item.receivedBytes/item.totalBytes*100).toFixed(2)+'%',
      size: (item.totalBytes/1024/1024).toFixed(1)+'M',
      name: item.musicItem?.name,
      artists: item.musicItem?.artists.map((at: any) => at.name).join(' / '),
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
              <FiMusic size={16}/>
            </i>
            <span className={styles.title}>{text}</span>
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
      title: '进度',
      key: 'percent',
      dataIndex: 'percent',
      flex: '1 0 0%',
      render: (text) => {
        return (
          <div className={styles.progress}>
            <Percent 
              value={text}
            />
          </div>
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

export default Downloading;
