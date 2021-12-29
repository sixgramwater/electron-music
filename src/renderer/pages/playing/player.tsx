import React, { useState, useEffect} from 'react';
import styles from './index.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import PlayerController from './playerController';

const Player: React.FC = () => {
  const [progressValue, setProgressValue] = useState(15);
  const onSliderChange = (value: number) => {
    setProgressValue(value);
  }
  const afterChange = (value: number) => {
    console.log(value);
  }
  return (
    <div className={styles.playerInner}>
      <div className={styles.progressContainer}>
        <Slider
          defaultValue={15}
          max={100}
          value={progressValue}
          onChange={onSliderChange}
          onAfterChange={afterChange}
          style={{
            touchAction: 'none',
          }}
          railStyle={{
            height: '2px',
            backgroundColor: 'hsla(0,0%,100%,.2)',
          }}
          trackStyle={{
            height: '2px',
            backgroundColor: '#1ece9a',
          }}
          handleStyle={{
            width: '10px',
            height: '10px',
            border: '2px solid #1ece9a',
            backgroundColor: '#1ece9a',
          }}
        />
      </div>
      <div className={styles.playerController}>
        <PlayerController/>
      </div>
    </div>
  )
}

export default Player;
