import React, { useState, useRef } from 'react';
import styles from './index.module.scss';
import Scroll from 'renderer/components/scrollbar';
import { useParams, useLocation } from 'react-router';
import { useQuery, useInfiniteQuery } from 'react-query';
import TableLoader from '../../components/Loader/TableLoader';
import MusicTable from '../../components/MusicTable';
import { search } from '../../api';
import { useIntersectionObserver } from '../../hooks/hooks';
import SpinLoader from '../../components/Loader/SpinLoader';
import DotLoader from '../../components/Loader/DotLoader';

interface queryType {
  query: string;
}
const SearchPage = () => {
  const { query } = useParams<queryType>();
  console.log(query);
  // const location = useLocation<any>();
  // const query = location.state? location.state.query: '';
  const rootRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const limit = 30;
  // const [page, setPage] = useState(0);
  const { data, status, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['search', query, 1],
      ({ pageParam = 0 }) => search(query, 30, pageParam * limit),
      {
        enabled: query !== '',
        getNextPageParam: (lastPage, allPages) => {
          // console.log('offset',(allPages.length)*limit );
          return lastPage.data ? allPages.length : false;
        },
      }
    );
  const handleIntersection = () => {
    console.log('intersect');
    fetchNextPage();
  };
  useIntersectionObserver({
    // root: rootRef,
    target: targetRef,
    onIntersect: handleIntersection,
    enabled: hasNextPage,
    threshold: 0.1,
  });
  // const temp = data?.pages[0].data;
  let songList = data?.pages.map((axiosRes) => axiosRes.data.result.songs);
  // console.log(songList);
  // let datalist = data?.pages;
  const dataList = songList
    ? [].concat(...songList).map((song: any) => {
        return {
          name: song.name,
          id: song.id,
          artists: song.ar,
          duration: song.dt,
          album: song.al,
          alias: song.alia,
        };
      })
    : [];
  // console.log(dataList);
  // let datalist = temp ? temp.data.list.map((resource: any) => {
  //   const track = resource.data;
  //   return {
  //     name: track.name,
  //     id: track.id,
  //     artists: track.ar,
  //     album: track.al,
  //     duration: track.dt,
  //   }
  // }) : [];

  return (
    <Scroll>
      <div className={styles.searchPage} ref={rootRef}>
        <div className={styles.pageInner}>
          <div className={styles.pageTitle}>
            <h2>搜索:“{query}”</h2>
          </div>
          <div className={styles.content}>
            {status === 'loading' ? (
              <TableLoader />
            ) : (
              <div className={styles.subContent}>
                <MusicTable dataSource={dataList} />
              </div>
            )}
            <div className={styles.loadMore} ref={targetRef}>
              {isFetchingNextPage ? (
                <DotLoader height="36px" size="20px" />
              ) : (
                <span>load more</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  );
};

export default SearchPage;
