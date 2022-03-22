import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import PlayerController from './playerController';
import { useAppDispatch, useAppSelector } from 'renderer/hooks/hooks';

const Player: React.FC = () => {
  const [progressValue, setProgressValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  // const curMusic = useAppSelector(state=>state.music.curMusic);
  const curTime = useAppSelector((state) => state.music.curTime);
  const duration = useAppSelector((state) => state.music.duration);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isDragging) return;
    setProgressValue(curTime);
  }, [curTime]);
  // const duration = useAppSelector(state=>state.music.duration);
  const onSliderChange = (value: number) => {
    setProgressValue(value);
  };
  const afterChange = (value: number) => {
    dispatch({
      type: 'music/setSeekTime',
      payload: value,
    });
    setIsDragging(false);
    console.log(value);
  };
  const beforeChange = () => {
    setIsDragging(true);
  };
  return (
    <div className={styles.playerInner}>
      <div className={styles.progressContainer}>
        <Slider
          defaultValue={0}
          max={duration}
          value={progressValue}
          onBeforeChange={beforeChange}
          onChange={onSliderChange}
          onAfterChange={afterChange}
          style={{
            touchAction: 'none',
          }}
          railStyle={{
            height: '2px',
            backgroundColor: 'hsla(0,0%,100%,.05)',
          }}
          trackStyle={{
            height: '2px',
            backgroundColor: 'var(--primary-color)',
          }}
          handleStyle={{
            width: '10px',
            height: '10px',
            border: '2px solid var(--primary-color)',
            backgroundColor: 'var(--primary-color)',
          }}
        />
      </div>
      <div className={styles.playerController}>
        <PlayerController />
      </div>
    </div>
  );
};

export default Player;
