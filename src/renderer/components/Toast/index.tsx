import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useAppSelector, useAppDispatch } from 'renderer/hooks/hooks';
import cx from 'classnames';
import { useDispatch } from 'react-redux';

const Toast = () => {
  const [showToast, setShowToast] = useState(false);
  // const showToast = useAppSelector((state) => state.app.showToast);
  const toastContent = useAppSelector((state) => state.app.toastContent);
  const dispatch = useAppDispatch();
  const timeoutRef = useRef<any>();
  useEffect(() => {
    if(toastContent === '')  return;
    setShowToast(true);
    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowToast(false);
      dispatch({
        type: 'app/setToastContent',
        payload: ''
      })
    }, 2500)
  }, [toastContent])
  const toastClass = cx(styles.toast, {
    [styles.show]: showToast
  })
  return (
    <div className={toastClass}>
      {toastContent}
    </div>
  )
}

export default Toast;
