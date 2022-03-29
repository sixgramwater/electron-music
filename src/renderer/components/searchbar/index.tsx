import React, { useCallback, useRef, useState } from 'react';
import styles from './index.module.scss';
import { FiSearch } from 'react-icons/fi';
import SearchPopup from './searchPopup';
import { useDebounce, useClickAway } from '../../hooks/hooks';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onChange?: (value: any) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { onSearch, onChange, placeholder } = props;
  const [query, setQuery] = useState('');
  // const [focused, setFocused] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const searchbarRef = useRef<HTMLDivElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onChange && onChange(e.target.value);
  };
  const handleClickSuffix = () => {
    onSearch && onSearch(query);
  };
  const handleClickAway = () => {
    setShowPopup(false);
  };
  useClickAway(searchbarRef, handleClickAway);

  const onPopupClick = (value: string) => {
    console.log('popup click:' + value);
    onSearch && onSearch(value);
    setShowPopup(false);
  };
  const handleFocus = () => {
    setShowPopup(true);
    // setFocused(true);
  };
  // const hanldeBlur = () => {
  //   setFocused(false);
  // }
  return (
    <div className={styles.searchBar} ref={searchbarRef}>
      <div className={styles.searchBarInner}>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          onFocus={handleFocus}
          // onBlur={hanldeBlur}
          placeholder={placeholder ? placeholder : '搜索音乐'}
        />
        <div className={styles.suffix}>
          <FiSearch onClick={handleClickSuffix} />
        </div>
      </div>
      {
        showPopup &&
        <SearchPopup
          query={debouncedQuery}
          onClickPopup={onPopupClick}
          show={showPopup}
        />
      }
      {/* <SearchPopup
        query={debouncedQuery}
        onClickPopup={onPopupClick}
        show={showPopup}
      /> */}
      {/* <div className={styles.searchPopup}>
        <div className={styles.popupInner}>
          <div className={styles.searchList}>
          </div>
          popup
        </div>
      </div> */}
      {/* <div className=""></div> */}
    </div>
  );
};

export default SearchBar;
