import React from 'react';
import styles from './index.module.scss';
import FooterPlayer from './footerPlayer';
// import cx from 'classnames';

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerInner}>
        <FooterPlayer />
      </div>
    </div>
  );
};

export default Footer;
