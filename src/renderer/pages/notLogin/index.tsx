import React, { useEffect } from 'react';
import styles from './index.module.scss';
import Button from 'renderer/components/Button';
import { useAppSelector } from 'renderer/hooks/hooks';
import { useHistory } from 'react-router';
import { createNewWindow } from 'renderer/api/ipc';


const NotLoginPage = () => {
  const user = useAppSelector(state=>state.app.user);
  const history = useHistory();
  const isLogined = user ? true : false;
  useEffect(() => {
    if(isLogined) {
      history.replace('/');
    }
  }, [isLogined]);
  const handleClick = () => {
    // console.log('click');
    createNewWindow({
      width: 400,
      height: 600,
      minHeight: 300,
      minWidth: 200,
      hash: 'login',
    });
  }
  return (
    <div className={styles.notLoginPage}>
      <div className={styles.pageContent}>
        <div className={styles.pageHeader}>
          <h1>您还没有登录</h1>
        </div>
        {/* <p>please login</p> */}
        <div className={styles.btn}>
          <Button onClick={handleClick}>登录</Button>
        </div>
      </div>
    </div>
  )
}

export default NotLoginPage;
