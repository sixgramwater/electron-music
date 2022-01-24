import React from 'react';
import { useQuery } from 'react-query';
import { fetchHotSearch, fetchSearchSuggest } from 'renderer/api';
import Scroll from '../scrollbar';
import styles from './index.module.scss';
import cx from 'classnames';
import SpinLoader from '../Loader/SpinLoader';
// import { useDebounce } from '../../hooks/hooks';

interface SearchPopupProps {
  query: string;
  onClickPopup?: (value: string) => void;
  show?: boolean;
}

const SearchPopup: React.FC<SearchPopupProps> = (props) => {
  const { query, onClickPopup, show } = props;
  const { data, isLoading } = useQuery('hotSearch', fetchHotSearch, {
    staleTime: 1000,
  });
  const suggestResult = useQuery(
    ['searchSuggest', query],
    () => fetchSearchSuggest(query),
    {
      enabled: query !== '',
    }
  );
  const rawSuggestData = suggestResult.data?.data.result;

  const showHotSearch = query === '';
  // const hotSearchData = hotSearchResult.data?.data.data;
  const rawHotSearchData = data?.data.data;
  const indexClass = (index: number) =>
    cx(styles.index, {
      [styles.colored]: index + 1 <= 3,
    });
  const formatArtists = (artistsList: any) => {
    // console.log(artistsList);
    return artistsList.map((artist: any) => artist.name).join('/');
  };

  const popupHeight = showHotSearch ? '400px' : '280px';
  const loaderHeight = showHotSearch ? '355px' : '240px';
  const handleClickHotSearchItem = (value: string) => {
    onClickPopup && onClickPopup(value);
  };

  const handleClickSong = (value: string) => {
    onClickPopup && onClickPopup(value);
  };

  const handleClickArtist = (value: string) => {
    onClickPopup && onClickPopup(value);
  };

  const handleClickAlbum = (value: string) => {
    onClickPopup && onClickPopup(value);
  };

  const highlightText = (text: string) => {
    if (query === '') return;
    const matched = text.match(query);
    if (!matched) return text;
    else {
      return (
        <>
          <span className={styles.highlighted}>{matched[0]}</span>
          <span>{text.substring(matched[0].length, text.length)}</span>
        </>
      );
    }
  };
  const popupClass = cx(styles.searchPopup, {
    [styles.show]: show,
  });
  return (
    <div
      className={popupClass}
      style={{
        height: popupHeight,
      }}
    >
      <Scroll height={popupHeight}>
        <div className={styles.popupInner}>
          {showHotSearch ? (
            <div className={styles.hotSearch}>
              {isLoading ? (
                <SpinLoader height={loaderHeight} />
              ) : (
                <>
                  <div className={styles.header}>
                    <h3>热门搜索</h3>
                  </div>
                  <div className={styles.mainContent}>
                    {rawHotSearchData &&
                      rawHotSearchData.map((item: any, index: number) => {
                        return (
                          <div
                            className={styles.listItem}
                            key={item.id}
                            onClick={() =>
                              handleClickHotSearchItem(item.searchWord)
                            }
                          >
                            <div className={indexClass(index)}>{index + 1}</div>
                            <div className={styles.content}>
                              <div className={styles.title}>
                                <span className={styles.musicTitle}>
                                  {item.searchWord}
                                </span>
                                <span className={styles.score}>
                                  {item.score}
                                </span>
                              </div>
                              <div className={styles.description}>
                                {item.content}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className={styles.searchList}>
              {suggestResult.isLoading ? (
                <SpinLoader height={loaderHeight} />
              ) : (
                <>
                  <div className={styles.section}>
                    <div className={styles.sectionTitle}>单曲</div>
                    <div className={styles.sectionContent}>
                      {rawSuggestData &&
                        rawSuggestData.songs?.map((track: any) => {
                          return (
                            <div
                              className={styles.suggestItem}
                              key={track.id}
                              onClick={() =>
                                handleClickSong(
                                  track.name +
                                    ' ' +
                                    formatArtists(track.artists)
                                )
                              }
                            >
                              <span className={styles.trackTitle}>
                                {highlightText(track.name)}
                              </span>
                              -
                              <span className={styles.trackArtists}>
                                {highlightText(formatArtists(track.artists))}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className={styles.section}>
                    <div className={styles.sectionTitle}>歌手</div>
                    <div className={styles.sectionContent}>
                      {rawSuggestData &&
                        rawSuggestData.artists?.map((artist: any) => {
                          return (
                            <div
                              className={styles.suggestItem}
                              key={artist.id}
                              onClick={() => handleClickArtist(artist.name)}
                            >
                              {/* <div className={styles.artistPic}>
                              <img src={artist.picUrl} alt={artist.name} />
                            </div> */}
                              <span className={styles.artistName}>
                                {highlightText(artist.name)}
                              </span>
                              {/* -<span className={styles.trackArtists}>{formatArtists(track.artists)}</span> */}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className={styles.section}>
                    <div className={styles.sectionTitle}>专辑</div>
                    <div className={styles.sectionContent}>
                      {rawSuggestData &&
                        rawSuggestData.albums?.map((album: any) => {
                          return (
                            <div
                              className={styles.suggestItem}
                              key={album.id}
                              onClick={() => handleClickAlbum(album.name)}
                            >
                              <span className={styles.albumName}>
                                {highlightText(album.name)}
                              </span>
                              -
                              <span className={styles.artistName}>
                                {highlightText(album.artist.name)}
                              </span>
                              {/* -<span className={styles.trackArtists}>{formatArtists(track.artists)}</span> */}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </Scroll>
    </div>
  );
};

export default SearchPopup;
