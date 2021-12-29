import React from 'react';
import styles from './index.module.scss';

const SearchBar: React.FC = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }
  return (
    <div className={styles.searchBar}>
      <input 
        type="text" 
        onChange={(e)=>handleChange(e)}
        placeholder="搜索音乐"
      />
    </div>
  )
}

export default SearchBar;