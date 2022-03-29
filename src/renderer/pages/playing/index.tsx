import React from 'react';
import styles from './index.module.scss';
import { AiOutlineDown } from 'react-icons/ai';
import HeaderButton from '../../components/headerButton';
import { useAppDispatch, useAppSelector } from 'renderer/hooks/hooks';
import Lyric from 'renderer/components/Lyric';
import cx from 'classnames';
// import Slider from 'rc-slider';
import Player from './player';
// import { useHistory } from 'react-router-dom'

const PlayingPage: React.FC = () => {
  // const history = useHistory();
  const dispatch = useAppDispatch();
  const showPlayingPage = useAppSelector((state) => state.app.showPlayingPage);
  const albumCover =
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fbf19f7ffec9278ce7f92cd79c132db9945d87c57a10c-63iyrZ_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640440257&t=1113a3a43c3d8214798abcf346e4b58d';
  const curMusic = useAppSelector((state) => state.music.curMusic);
  const handleClickExitButton = () => {
    // history.go(-1);
    dispatch({
      type: 'app/toggleShowPlayingPage',
      payload: false,
    });
  };
  const playingPageClass = cx(styles.playingPage, {
    [styles.show]: showPlayingPage,
  });
  return (
    <div
      className={playingPageClass}
      // style={{
      //   backgroundImage: `url(${albumCover})`,
      // }}
    >
      <div
        className={styles.mask}
        // style={{
        //   backgroundImage: `url(${albumCover})`,
        // }}
      ></div>
      <div
        className={styles.bgPlayer}
        style={{
          backgroundImage: `url(${
            curMusic ? curMusic.album.picUrl : albumCover
          })`,
        }}
      ></div>
      <div className={styles.pageInner}>
        <div className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.exitIcon} onClick={handleClickExitButton}>
              <AiOutlineDown />
            </div>
            <div className={styles.headerBtns}>
              <HeaderButton />
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.albumCover}>
            <img src={curMusic?.album.picUrl} alt="cover" />
          </div>
          <div className={styles.musicInfo}>
            <div className={styles.musicInfoHeader}>
              <div className={styles.title}>{curMusic?.name}</div>
              <div className={styles.otherInfo}>
                <div>歌手: {curMusic?.artists[0].name}</div>
                <div>专辑: {curMusic?.album.name}</div>
              </div>
            </div>
            <div className={styles.lyricContainer}>
              {
                showPlayingPage &&
                <Lyric id={curMusic?.id} />
              }
            </div>
          </div>
        </div>
        <div className={styles.player}>
          <Player />
        </div>
      </div>
    </div>
  );
};

export default PlayingPage;
