import { useQueries } from "react-query";
import styles from './index.module.scss';
import Slider from "renderer/components/slider";
import { fetchHqPlaylist, fetchUserRecPlaylist } from "renderer/api";


const LibHome = () => {
  const result = useQueries([
    {
      queryKey: 'userRecPlaylist',
      queryFn: () => fetchUserRecPlaylist().then(data => data.playlists.map((list:any) => {
        return {
          id: list.id,
          name: list.name,
          picUrl: list.coverImgUrl
        }
      }))

    },
    {
      queryKey: 'hqPlaylist',
      queryFn: () => fetchHqPlaylist().then(data => data.playlists.map((list:any) => {
        return {
          id: list.id,
          name: list.name,
          picUrl: list.coverImgUrl
        }
      }))
    }
  ]);
  const mappedUserRecData = result[0].data;
  const mappedHqData = result[1].data;
  const allLoading = result[0].isLoading || result[1].isLoading;
  return (
    allLoading ? <span>loading</span> :
    <div className={styles.libHome}>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <h2>精品歌单</h2>
        </div>
        <div className={styles.sectionContent}>
          <Slider
            data={mappedHqData}
          />
        </div>
      </div>
      <div className={styles.section}>
      <div className={styles.sectionTitle}>
        <h2>网友推荐歌单</h2>
        </div>
        <div className={styles.sectionContent}>
          <Slider
            data={mappedUserRecData}
          />
        </div>
      </div>
    </div>
  )
}

export default LibHome;
