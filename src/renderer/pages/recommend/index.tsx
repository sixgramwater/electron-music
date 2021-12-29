import React, {useState, useEffect} from 'react';
import styles from './index.module.scss';
// import AlbumItem from 'renderer/components/AlbumItem';
import Scroll from 'renderer/components/scrollbar';
import Slider from '../../components/slider';
import AlbumItemLoader from 'renderer/components/Loader/AlbumItemLoader';
import { useAppSelector, useAppDispatch } from 'renderer/hooks/hooks';
import { fetchDailyRecommendPlaylist } from 'renderer/api';
import { PlaylistType } from 'renderer/store/musicSlice';
const Recommend: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const playLists = useAppSelector(state=>state.music.recommendPlaylist);
  useEffect(() => {
    if(playLists.length!==0)  return;
    setIsLoading(true);
    fetchDailyRecommendPlaylist().then((res) => {
      console.log(res.data.recommend);
      const playlists = res.data.recommend.map((item:any) => {
        return {
          id: item.id,
          name: item.name,
          copywriter: item.copywriter,
          picUrl: item.picUrl,
          playCount: item.playCount,
          createTime: item.createTime,
          creator: {
            avatarUrl: item.creator.avatarUrl,
            nickname: item.creator.nickname,
            signature: item.creator.signature,
          }
        } as PlaylistType
      })
      console.log(playlists);
      dispatch({
        type: 'music/setRecommendPlaylist',
        payload: playlists,
      })
      setIsLoading(false);
    })
  }, [])
  // const playlists = [
  //   {
  //     id: 3136952023,
  //     name: "私人雷达 | 根据听歌记录为你打造",
  //     "picUrl": "https://p1.music.126.net/3I-73aQn3YCw-2cZdK1fQw==/109951166027478939.jpg",
  //   }
  // ]

  return (
    isLoading ?
    <AlbumItemLoader/>
    :
    <Scroll>
      <div className={styles.pageRecommend}>
        <div className={styles.pageInner}>
          <h1 className={styles.pageTitle}>推荐</h1>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Hi Quin33 今日为您推荐</h2>
            </div>
            <div className={styles.sectionContent}>
              {/* <AlbumItem/>
              <AlbumItem/>
              <AlbumItem/>
              <AlbumItem/> */}
              <Slider
                data={playLists}
              />
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>你的私荐歌单</h2>
            </div>
            <div className={styles.sectionContent}>
              <Slider
                data={playLists}
              />
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  )
}
export default Recommend;
