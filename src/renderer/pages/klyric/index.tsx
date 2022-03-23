import React, { useState } from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import { VscChromeClose } from 'react-icons/vsc';
import { closeHashWindow } from 'renderer/api/ipc';
// import { MdCloseFullscreen } from 'react-icons/md';

const KLyric = () => {
  const [showMask, setShowMask] = useState(false);
  const handleMouseEnter = () => {
    setShowMask(true);
  }

  const handleMouseOut = () => {
    setShowMask(false);
  }
  const maskClass = cx(styles.klyricMask, {
    [styles.show]: showMask,
  });

  const handleClose = () => {
    closeHashWindow('klyric');
  }
  // const handle
  return (
    <div className={styles.klyric}>
      <div className={maskClass}  onMouseOut={handleMouseOut}>
        <div className={styles.controlBar}>
          <div className={styles.icon} onClick={handleClose}>
          <VscChromeClose />
          </div>
        </div>
      </div>
      <div className={styles.lyricContainer} onMouseEnter={handleMouseEnter}>
        QQ音乐 听我想听
        {/* <span></span> */}
      </div>
    </div>
  )
}

export default KLyric;
