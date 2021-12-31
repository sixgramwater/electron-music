import React, {useEffect} from 'react';
import styles from './index.modules.scss';
import { message } from 'antd';
import { dbInstance } from 'renderer/api/ipc';
import { useAppSelector, useAppDispatch } from 'renderer/hooks/hooks';

const DownloadPage: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const ipcRenderer = window.electron.ipcRenderer;
    ipcRenderer.on('new-download-item', (e: any, item: any) => {
      // 数据库新增一条新纪录
      dbInstance.createDownloadItem(item).then(() => {
        console.log(item);
        dispatch({
          type: 'download/addItem',
          payload: item,
        });
        message.success('新增下载成功');
      }).catch(()=>{
        message.error('新增下载失败');
      })

      // UI中新增一条下载任务
    })

    // 更新下载窗口的任务进度
    ipcRenderer.on('download-item-updated', (e: any, item: any) => {
      dispatch({
        type: 'download/updateItem',
        payload: item,
      })
      // this.updateItem(item)
    })


    // 下载结束，更新数据
    ipcRenderer.on('download-item-done', (e: any, item: any) => {
      dbInstance.updateDownloadItem(item.id, item).then(()=>{
        dispatch({
          type: 'download/updateItem',
          payload: item,
        })
      })
      // 更新数据库
      // dbInstance.updateDownloadItem()

      // 更新UI中下载任务状态
      // this.updateItem(item);
    });
  }, []);

  return (
    <div className={styles.downloadPage}>
      download page
    </div>
  )
}

export default DownloadPage;
