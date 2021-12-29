import React from 'react';
import styles from './index.module.scss';
import { Routes, Route } from 'react-router-dom';

const Rec = () => {
  return(
    <div>
      recommend
    </div>
  )
}

const Lib = () => {
  return(
    <div>
      library
    </div>
  )
}

const Like = () => {
  return (
    <div>
      like
    </div>
  )
}


const Content:React.FC = () => {
  return(
    <div className={styles.content}>
      <Routes>
        <Route path="/" element={<Rec />}/>
        <Route path="/lib" element={<Lib />}/>
        <Route path="/like" element={<Like />}/>
      </Routes>
    </div>
  )
}

export default Content;