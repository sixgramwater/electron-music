import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { Popover, message } from 'antd';
import cx from 'classnames';

export interface PopoverProps {

}

const themeConfig = [
  {
    name: '默认绿',
    value: '',
    color: '#1ece9a'
  },
  {
    name: '深邃蓝',
    value: 'theme-blue',
    color: '#1890ff'
  },
  {
    name: '热情红',
    value: 'theme-red',
    color: '#e20001'
  }
]

const ThemePopoverInner = () => {
  const [theme, setTheme] = useState('');
  useEffect(() => {
    const unparsedTheme = localStorage.getItem('theme');
    if(unparsedTheme) {
      const memTheme = unparsedTheme;
      setTheme(memTheme);
    }
  }, [])
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  const handleClickTheme = (value: string) => {
    setTheme(value);
    message.success('主题切换成功');
    localStorage.setItem('theme', value);
  }
  const themeItemClass = (value: string) => cx(styles.themeItem, {
    [styles.selected]: theme === value
  })
  return (
    <div className={styles.themePopover}>
      {/* <div className={styles.title}></div> */}
      <div className={styles.themeChanger}>
        {
          themeConfig.map(item => {
            return(
              <div className={themeItemClass(item.value)} onClick={() => handleClickTheme(item.value)} key={item.value}>
                <div className={styles.colorPreview}>
                  <div className={styles.colorBlock} style={{backgroundColor: item.color}}></div>
                </div>
                <div className={styles.info}>
                  <span>{item.name}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
const ThemePopover: React.FC<PopoverProps> = (props) => {
  const { children } = props;
  return (
    <Popover content={ThemePopoverInner} title='主题切换' placement='bottom' trigger='click'>
      {children}
    </Popover>
  )
}

export default ThemePopover;
