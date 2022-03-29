import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useInfiniteQuery } from 'react-query';
import Scroll from 'renderer/components/scrollbar';
import { fetchMusicDetail, fetchLikelist } from 'renderer/api';
import { useAppDispatch, useAppSelector, useIntersectionObserver } from 'renderer/hooks/hooks';
import MusicTable from 'renderer/components/MusicTable';
import DotLoader from 'renderer/components/Loader/DotLoader';
import TableLoader from 'renderer/components/Loader/TableLoader';

const getSlice = (array: number[], limit: number = 30, page: number = 0) => {
  return array.slice(page*limit, page*limit+limit).join(',');
}

const Like: React.FC = () => {
  const dispatch = useAppDispatch();
  const likeList = useAppSelector(state=>state.app.likeList);
  const user = localStorage.getItem('user');
  const uid = user ? JSON.parse(user).id : -1;
  const rootRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const limit = 30;
  const maxPageSize = likeList? likeList.length / limit >> 0 : 0;
  // const [checkPoint, setCheckPoint] = useState(-1);
  useEffect(() => {
    // console.log(uid);
    if(likeList.length !== 0)  return;
    fetchLikelist(uid).then((value: any) => {
      // console.log(value);
      // const cpt: number = value.checkPoint;
      // setCheckPoint(cpt);
      dispatch({
        type: 'app/setLikeList',
        payload: value.ids,
      })
    })
  }, []);

  const handleIntersection = () => {
    console.log('intersect');
    fetchNextPage();
  }

  const { data, status, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['likelist', likeList],
    ({ pageParam = 0 }) => fetchMusicDetail(getSlice(likeList, limit, pageParam))
      .then(value => value.songs.map((song: any) => {
        return {
          name: song.name,
          id: song.id,
          artists: song.ar,
          duration: song.dt,
          album: song.al,
          alias: song.alia,
        };
      })),
    {
      // staleTime: Infinity,
      enabled: likeList?.length !== 0,
      getNextPageParam: (lastPage, allPages) => allPages.length+1 > maxPageSize ? undefined : allPages.length+1,
    }

  )
  // console.log(data);
  useIntersectionObserver({
    target: targetRef,
    onIntersect: handleIntersection,
    enabled: hasNextPage,
    threshold: 0.1
  })
  const mappedList = data?.pages ? [].concat(...data.pages) : [];
  return (
    <Scroll>
    <div className={styles.likePage} ref={rootRef}>
      <div className={styles.pageTitle}>
        <h1>我喜欢</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.subContent}>
          {
            status === 'loading' ? <TableLoader/> :
            <MusicTable
              dataSource={mappedList}
            />
          }

        </div>
        <div className={styles.loadMore} ref={targetRef}>
          {isFetchingNextPage ? (
            <DotLoader height="36px" size="20px" />
          ) : (
            <span>load more</span>
          )}
        </div>
      </div>
    </div>
    </Scroll>
  )
};

export default Like;
