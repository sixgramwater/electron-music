import React from 'react';
import styles from './index.module.scss';


export interface ButtonProps {
  prefix?: React.ReactElement;
  onClick?: () => void;
  children: string;
}
const Button: React.FC<ButtonProps> = (props) => {
  const { children, prefix, onClick } = props;
  const handleClick = () => {
    onClick && onClick();
  }
  return (
    <div className={styles.button}>
      <div className={styles.prefix}>
        {prefix}
      </div>
      <span onClick={() => handleClick}>{children}</span>
    </div>
  )
}

export default Button;
