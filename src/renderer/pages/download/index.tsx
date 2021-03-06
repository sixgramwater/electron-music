import React from 'react';
import styles from './index.module.scss';
import Scroll from 'renderer/components/scrollbar';
import { Tabs, TabItem } from '../../components/Tabs/TabNav';
import Downloading from './downloading';
import Downloaded from './downloaded';

const DownloadPage: React.FC = () => {
  return (
    <Scroll>
      <div className={styles.downloadPage}>
        <div className={styles.pageInner}>
          <div className={styles.pageTitle}>
            <h2>本地和下载</h2>
          </div>
          <div className={styles.content}>
            <Tabs defaultActiveKey={'downloaded'}>
              {/* <TabItem key="local" tab="本地下载">
                local download content 123123123213
              </TabItem> */}
              <TabItem key="downloaded" tab="已下载">
                <Downloaded />
              </TabItem>
              <TabItem key="downloading" tab="下载中">
                {/* downloading content */}
                <Downloading/>

              </TabItem>
            </Tabs>
          </div>
        </div>
      </div>
    </Scroll>
  );
};

export default DownloadPage;
