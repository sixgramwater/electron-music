import { Popover } from "antd";
import React from 'react';
import { useHistory } from "react-router";
import { createNewWindow } from "renderer/api/ipc";
import { useAppDispatch } from "renderer/hooks/hooks";
import styles from './index.module.scss';


const UserPopover: React.FC = (props) => {
  const { children } = props;
  return (
    <Popover content={UserPopoverInner} placement="bottom" trigger='click' className={styles.popover}>
      {children}
    </Popover>
  )
}

const UserPopoverInner = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const handleOpenLogin = () => {
    createNewWindow({
      width: 400,
      height: 600,
      minHeight: 300,
      minWidth: 200,
      hash: 'login',
    });
  }
  const handleLogout = () => {
    dispatch({
      type: 'app/setUser',
      payload: undefined,
    });
    localStorage.removeItem('user');
  }
  const handleGotoPersonal = () => {
    history.push('/personal');
  }
  return (
    <div className={styles.userPopover}>
      <div className={styles.list}>
        <div className={styles.listItem} onClick={handleGotoPersonal}>
          <span>个人中心</span>
        </div>
        <div className={styles.listItem} onClick={handleOpenLogin}>
          <span>切换账号</span>
        </div>
        <div className={styles.listItem} onClick={handleLogout}>
          <span>退出登录</span>
        </div>
      </div>
    </div>
  )
}

export default UserPopover;
