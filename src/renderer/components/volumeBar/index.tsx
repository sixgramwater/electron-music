import React, { useState, useEffect, useRef } from 'react';
import Slider from 'rc-slider';
import styles from './index.module.scss';
import { MdVolumeDown } from 'react-icons/md';
import {
  useAppSelector,
  useAppDispatch,
  useClickAway,
} from 'renderer/hooks/hooks';
import cx from 'classnames';

const VolumeBar = () => {
  const dispatch = useAppDispatch();
  const musicVolume = useAppSelector((state) => state.music.volume);
  const volumeRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  // const [volume, setVolume] = React.useState(0.5);
  // useEffect(() => {
  // 	dispatch({
  // 		type: 'music/setVolume',
  // 		payload: volume
  // 	})
  // }, [volume]);
  const setMusicVolume = (volume: number) => {
    dispatch({
      type: 'music/setVolume',
      payload: volume,
    });
  };
  const popupClass = cx(styles.popup, {
    [styles.show]: showPopup,
  });

  const renderButton = () => {};
  const handleClickButton = () => {
    setShowPopup((show) => !show);
  };
  const handleChange = (value: number) => {
    setMusicVolume(value);
  };
  const handleClickAway = () => {
    setShowPopup(false);
  };
  useClickAway(volumeRef, handleClickAway);

  return (
    <div className={styles.volumeBar} ref={volumeRef}>
      <div className={styles.playerButton} onClick={handleClickButton}>
        <MdVolumeDown style={{ fontSize: '20px' }} />
      </div>
      <div className={popupClass}>
        <div className={styles.sliderContainer}>
          <Slider
            defaultValue={0.5}
            max={1}
            value={musicVolume}
            onChange={handleChange}
            vertical={true}
            step={0.02}
            style={{
              touchAction: 'none',
            }}
            railStyle={{
              // height: '1px',
              width: '3px',
              // backgroundColor: 'hsla(0,0%,100%,.05)',
            }}
            trackStyle={{
              width: '3px',
              backgroundColor: '#1ece9a',
            }}
            handleStyle={{
              width: '12px',
              height: '12px',
              border: '1px solid #1ece9a',
              backgroundColor: '#1ece9a',
              transform: 'translateX(1px)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VolumeBar;
