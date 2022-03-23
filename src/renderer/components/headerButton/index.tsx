import React, { useState } from 'react';
import styles from './index.module.scss';
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscChromeClose,
} from 'react-icons/vsc';
import { maxWindow, minWindow, closeWindow } from 'renderer/api/ipc';
import { Modal, Radio, Checkbox, Space } from 'antd';

const HeaderButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isQuit, setIsQuit] = useState(false);
  const [memCheck, setMemCheck] = useState(false);
  const handleClose = () => {
    const result = localStorage.getItem('isQuit');
    if(result) {
      const isQuit = JSON.parse(result);
      if(isQuit) {
        // isQuit
        closeWindow();
      } else {
        // console.log('hide window send');
        closeWindow(true);
      }
    } else {
      setVisible(true);
    }

  }
  const handleCancel = () => {
    setVisible(false);
  }
  const handleOk = () => {
    if(memCheck) {
      localStorage.setItem('isQuit', JSON.stringify(isQuit));
    }
    if(isQuit) {
      // isQuit
      setVisible(false);
      setTimeout(()=>{
        closeWindow();
      }, 200)

    } else {
      setVisible(false);
      setTimeout(() => {
        closeWindow(true);

      }, 200)
      // console.log('hide window send');
      // closeWindow(true);
    }

  }
  const handleChange = (e: any) => {
    console.log(e.target.value);
    setIsQuit(e.target.value);
  }
  const handleChangeCheck = (e: any) => {
    setMemCheck(e.target.checked)
  }
  return (
    <div className={styles.headerButton}>
      <div className={styles.btn} onClick={minWindow}>
        <VscChromeMinimize />
      </div>
      <div className={styles.btn} onClick={maxWindow}>
        <VscChromeMaximize />
      </div>
      <div className={styles.btn} onClick={handleClose}>
        <VscChromeClose />
      </div>
      <Modal title="关闭提示" visible={visible} onCancel={handleCancel} onOk={handleOk}>
        <div className={styles.closeModel}>
          <Radio.Group onChange={handleChange} value={isQuit}>
            <Space direction="vertical">
              <Radio value={false}>最小化到托盘</Radio>
              <Radio value={true}>直接关闭</Radio>
            </Space>
          </Radio.Group>
          <Checkbox onChange={handleChangeCheck} checked={memCheck}>记住我的选择</Checkbox>
        </div>
      </Modal>
    </div>
  );
};

export default HeaderButton;
