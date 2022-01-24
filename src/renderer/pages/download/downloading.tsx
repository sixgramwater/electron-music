import React from 'react';
import styles from './index.module.scss';
import MusicTable from 'renderer/components/MusicTable';
import { fetchRecentPlayedSongs } from 'renderer/api';
import { useQuery } from 'react-query';
import TableLoader from 'renderer/components/Loader/TableLoader';

const Downloading: React.FC = () => {
  const { isLoading, data } = useQuery({
    queryKey: 'recentSongs',
    queryFn: fetchRecentPlayedSongs,
  });
  let datalist: any = [];
  if (data) {
    const temp = data as any;
    console.log(temp);
    // datalist = temp.data.list.map((resource: any) => {
    //   const track = resource.data;
    //   return {
    //     name: track.name,
    //     id: track.id,
    //     artists: track.ar,
    //     album: track.al,
    //     duration: track.dt,
    //   }
    // });
  }

  return isLoading ? (
    <TableLoader />
  ) : (
    <div className={styles.subContent}>
      <MusicTable dataSource={datalist} />
    </div>
  );
};

export default Downloading;
