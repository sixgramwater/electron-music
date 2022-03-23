import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
// import AlbumItem from 'renderer/components/AlbumItem';
import Scroll from 'renderer/components/scrollbar';
import Slider from '../../components/slider';
import AlbumItemLoader from 'renderer/components/Loader/AlbumItemLoader';
// import { useAppSelector, useAppDispatch } from 'renderer/hooks/hooks';
import { fetchDailyRecommendPlaylist, fetchHomepageResource } from 'renderer/api';
import { PlaylistType } from 'renderer/store/musicSlice';
import { fetchOfficialPlaylist } from 'renderer/api';
import { useQueries, useQuery } from 'react-query';
import { useAppSelector } from 'renderer/hooks/hooks';

const Recommend: React.FC = () => {
  const user = useAppSelector(state=>state.app.user);
  // const dispatch = useAppDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  // const playLists = useAppSelector(state=>state.music.recommendPlaylist);
  const homepageResourceResult = useQuery(['homePage'], () =>fetchHomepageResource(), {
    staleTime: Infinity,
  });
  const homepageData = homepageResourceResult.data?.data;
  const recPlaylist = homepageData?.blocks
    .find((block: any) => block.blockCode === 'HOMEPAGE_BLOCK_PLAYLIST_RCMD')
    .creatives;

  const mappedRecPlaylist = recPlaylist?.map((item: any) => {
    const resource = item?.resources[0];
    return {
      id: resource?.resourceId,
      name: resource?.uiElement.mainTitle.title,
      picUrl: resource?.uiElement.image.imageUrl,
    }
  });

  const radorPlaylist = homepageData?.blocks
    .find((block: any) => block.blockCode === 'HOMEPAGE_BLOCK_MGC_PLAYLIST')
    .creatives;

  const mappedRadorPlaylist = radorPlaylist?.map((item: any) => {
    // console.log(item);
    const resource = item?.resources[0];
    return {
      id: resource?.resourceId,
      name: resource?.uiElement.mainTitle.title,
      picUrl: resource?.uiElement.image.imageUrl,
    }
  })
  // console.log(mappedRadorPlaylist);
  // const result = useQueries([
  //   {
  //     queryKey: 'dailyRecommend',
  //     queryFn: fetchDailyRecommendPlaylist,
  //     // enabled: playLists.length === 0,
  //   },
  //   {
  //     queryKey: 'officialPlaylist',
  //     queryFn: fetchOfficialPlaylist,
  //   },
  // ]);
  // const dailyRecommendList = result[0].data?.data.recommend.map((item: any) => {
  //   return {
  //     id: item.id,
  //     name: item.name,
  //     copywriter: item.copywriter,
  //     picUrl: item.picUrl,
  //     playCount: item.playCount,
  //     createTime: item.createTime,
  //     creator: {
  //       avatarUrl: item.creator.avatarUrl,
  //       nickname: item.creator.nickname,
  //       signature: item.creator.signature,
  //     },
  //   } as PlaylistType;
  // });
  // const officialPlaylist = result[1].data?.data.playlist.map((item: any) => {
  //   return {
  //     id: item.id,
  //     name: item.name,
  //     copywriter: item.copywriter,
  //     picUrl: item.coverImgUrl,
  //     playCount: item.playCount,
  //     createTime: item.createTime,
  //     creator: {
  //       avatarUrl: item.creator.avatarUrl,
  //       nickname: item.creator.nickname,
  //       signature: item.creator.signature,
  //     },
  //   } as PlaylistType;
  // });
  // console.log(officialPlaylist);
  // console.log(result[1].data?.data)
  const isLoading2 = homepageResourceResult.isLoading;
  // const isLoading2 = result[0].isLoading || result[1].isLoading;
  // useEffect(() => {
  //   if(playLists.length!==0)  return;
  //   setIsLoading(true);
  //   fetchDailyRecommendPlaylist().then((res) => {
  //     console.log(res.data.recommend);
  //     const playlists = res.data.recommend.map((item:any) => {
  //       return {
  //         id: item.id,
  //         name: item.name,
  //         copywriter: item.copywriter,
  //         picUrl: item.picUrl,
  //         playCount: item.playCount,
  //         createTime: item.createTime,
  //         creator: {
  //           avatarUrl: item.creator.avatarUrl,
  //           nickname: item.creator.nickname,
  //           signature: item.creator.signature,
  //         }
  //       } as PlaylistType
  //     })
  //     // console.log(playlists);
  //     dispatch({
  //       type: 'music/setRecommendPlaylist',
  //       payload: playlists,
  //     })
  //     setIsLoading(false);
  //   })
  // }, [])
  // const playlists = [
  //   {
  //     id: 3136952023,
  //     name: "私人雷达 | 根据听歌记录为你打造",
  //     "picUrl": "https://p1.music.126.net/3I-73aQn3YCw-2cZdK1fQw==/109951166027478939.jpg",
  //   }
  // ]

  return isLoading2 ? (
    <AlbumItemLoader />
  ) : (
    <Scroll>
      <div className={styles.pageRecommend}>
        <div className={styles.pageInner}>
          <h1 className={styles.pageTitle}>推荐</h1>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>Hi {user?.nickname} 今日为您推荐</h2>
            </div>
            <div className={styles.sectionContent}>
              {/* <AlbumItem/>
              <AlbumItem/>
              <AlbumItem/>
              <AlbumItem/> */}
              <Slider data={mappedRecPlaylist} />
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sectionTitle}>
              <h2>你的雷达歌单</h2>
            </div>
            <div className={styles.sectionContent}>
              <Slider data={mappedRadorPlaylist} />
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  );
};
export default Recommend;
