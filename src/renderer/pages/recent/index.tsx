import React from 'react';
import styles from './index.module.scss';
import Scroll from 'renderer/components/scrollbar';
import { fetchRecentPlayedSongs } from 'renderer/api';
import MusicTable from 'renderer/components/MusicTable';
import { useQuery } from 'react-query';
import TableLoader from 'renderer/components/Loader/TableLoader';

// import { Tabs, TabItem } from '../../components/Tabs/TabNav';

const RecentPage: React.FC = () => {
  // const result2 = useQueries([
  //   {
  //     queryKey: 'dailyRecommend',
  //     queryFn: fetchDailyRecommendPlaylist,
  //     // enabled: playLists.length === 0,
  //   },
  //   {
  //     queryKey: 'officialPlaylist',
  //     queryFn: fetchOfficialPlaylist,
  //   }
  // ]);
  // useQueries[{

  // }]
  const result = useQuery('recentSongs', fetchRecentPlayedSongs);
  // console.log(result.data?.data);
  // let datalist: any = [];
  const temp = result.data?.data;
  console.log(temp);
  let datalist = temp
    ? temp.data.list.map((resource: any) => {
        const track = resource.data;
        return {
          name: track.name,
          id: track.id,
          artists: track.ar,
          album: track.al,
          duration: track.dt,
          alias: track.alia,
        };
      })
    : [];

  return (
    <Scroll>
      <div className={styles.recentPage}>
        <div className={styles.pageInner}>
          <div className={styles.pageTitle}>
            <h2>最近播放</h2>
          </div>
          <div className={styles.content}>
            {result.isLoading ? (
              <TableLoader />
            ) : (
              <div className={styles.subContent}>
                <MusicTable dataSource={datalist} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Scroll>
  );
};

export default RecentPage;
