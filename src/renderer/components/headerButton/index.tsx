import React from 'react';
import styles from './index.module.scss';
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from "react-icons/vsc";
import { maxWindow, minWindow, closeWindow } from 'renderer/api/ipc';

const HeaderButton: React.FC = () => {
  return (
    <div className={styles.headerButton}>
      <div className={styles.btn} onClick={minWindow}><VscChromeMinimize/></div>
      <div className={styles.btn} onClick={maxWindow}><VscChromeMaximize/></div>
      <div className={styles.btn} onClick={closeWindow}><VscChromeClose/></div>
      
    </div>
  )
}

export default HeaderButton;