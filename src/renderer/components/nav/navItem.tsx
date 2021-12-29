import React from 'react';
import styles from './index.module.scss';
import { useHistory, useLocation } from 'react-router-dom';
import cx from 'classnames';

export interface NavItemProps {
  // onClick: ()=>void;
  title: string;
  path: string;
  icon: React.ReactElement;
}

const NavItem: React.FC<NavItemProps> = (props) => {
  const {
    path,
    title,
    icon
  } = props;
  let history = useHistory();
  const location = useLocation();
  const isActive = location.pathname === path;
  const handleClickItem = () => {
    console.log(path);
    history.push(path)
  }
  const navItemClass = cx(styles.navItem, {
    [styles.active]: isActive,
  })
  return (
    // <li className={styles.navItem}>
    //   <NavLink to={path} >
    //     {title}
    //   </NavLink>
    // </li>
    <div className={navItemClass} onClick={handleClickItem}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.title}>{title}</div>
    </div>
  )
}

export default NavItem;
