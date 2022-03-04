import React, { useState } from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { Tabs } from 'antd';

export interface TabsProps {
  className?: string;
  children: any;
  // children: React.ReactChild[];
  defaultActiveKey: string | number;
}

export const Tabs: React.FC<TabsProps> = (props) => {
  const { children, className, defaultActiveKey } = props;
  const [activeKey, setActiveKey] = useState(
    defaultActiveKey ? defaultActiveKey : 0
  );
  const handleClickNav = (key: any) => {
    setActiveKey(key);
  };

  // const renderContent = (key: string) => {
  //   React.Children.map()
  // }
  return (
    <div className={styles.tabs}>
      <div className={styles.tabsNav}>
        <div className={styles.tabsNavWrap}>
          <div className={styles.tabsNavList}>
            {React.Children.map(children, (child, index) => {
              if (!child) return;
              // console.log(child);
              const key = child.key;
              const navItemClass = cx(styles.tabsNavItem, {
                [styles.active]: activeKey === key,
              });
              // if(!child || child.type !== 'TabItem')
              // throw('children type not supported!');
              return (
                <div
                  className={navItemClass}
                  key={key ? key : index}
                  onClick={() => handleClickNav(key)}
                >
                  <div className={styles.tabsNavButton}>{child.props.tab}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.tabsContentHolder}>
        <TransitionGroup component={null}>
          {React.Children.map(children, (child, index) => {
            const key = child.key ? child.key : index;
            return (
              key === activeKey && (
                <CSSTransition key={activeKey} timeout={250} classNames="fade">
                  {child}
                </CSSTransition>
              )
            );
          })}
        </TransitionGroup>
      </div>
    </div>
  );
};

export interface TabItemProps {
  tab: string;
  key: string | number;
}

export const TabItem: React.FC<TabItemProps> = (props) => {
  const { tab, key, children } = props;

  return <div className={styles.tabsContent}>{children}</div>;
};
