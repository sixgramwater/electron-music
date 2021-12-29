import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import { MdArrowBackIos, MdArrowForwardIos }  from 'react-icons/md';
import { usePageResize } from 'renderer/hooks/hooks';
import AlbumItem from '../AlbumItem';
// import { Row, Col } from 'antd';

type dataType = {
  id: number;
  name: string;
  picUrl: string;
}

export interface SliderProps {
  data: dataType[];
  // pageSize: number;
  // pageSize: number;
}

const Slider: React.FC<SliderProps> = (props) => {
  const {
    // pageSize
    data
  } = props;
  // const layout = {
  //   xs: 4,
  //   sm: 5,
  // }
  const { width } = usePageResize();
  useEffect(() => {
    setCurPage(0);
    if(!width) return;
    if(width < 768) {
      console.log('pageSize: 4')
      setPageSize(4);
    } else if(width >= 768 && width < 1000) {
      console.log('pageSize: 5')
      setPageSize(5);
    } else {
      setPageSize(6);
    }
  }, [width])
  const [curPage, setCurPage] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [showControl, setShowControl] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const maxPage = Math.floor(data.length / pageSize)
  useEffect(() => {
    const enterHandler = () => {
      setShowControl(true);
    }
    const leaveHandler = () => {
      setShowControl(false);
    }
    sliderRef.current?.addEventListener('mouseenter', enterHandler);
    sliderRef.current?.addEventListener('mouseleave', leaveHandler);

    return () => {
      sliderRef.current?.removeEventListener('mouseenter', enterHandler);
      sliderRef.current?.removeEventListener('mouseleave', leaveHandler);
    }
  }, [])
  const controlClass = cx(styles.sliderControl,{
    [styles.show]: showControl
  })
  const clickLeftArrow = () => {

    setCurPage(page => page > 0 ? page-1 : 0);
  }
  const clickRightArrow = () => {
    setCurPage(page => page < maxPage ? page+1 : maxPage);
  }
  const colWidth = () => {
    return `calc((100% - ${(pageSize-1)*20}px) / ${pageSize})`
  }
  return (
    <div className={styles.slider} ref={sliderRef}>
      <div className={styles.sliderContent}>
        <div className={styles.page}
          style={{
            transform: `translateX(calc(-${curPage*100}% - ${curPage*20}px))`
          }}
        >
          {
            data.map(item => {
              // console.log(item);
              return (
                <div className={styles.col}
                  key={item.id}
                  style={{
                    width: colWidth(),
                    // transform: `translateX(-${curPage*100}%)`
                  }}
                >
                  <AlbumItem
                    id={item.id}
                    name={item.name}
                    picUrl={item.picUrl}
                  />
                </div>
              )
            })
          }

          {/* <Row>
            {
              data.map(item => (
                <Col xs={6} sm={4.8} md={4}></Col>
              ))
            }
          </Row> */}
        </div>
        <div className={styles.page}></div>
      </div>
      <div className={controlClass}>
        <div className={styles.controlInner}>
          <span className={cx(styles.icon, styles.left)} onClick={clickLeftArrow}><MdArrowBackIos /></span>
          <span className={cx(styles.icon, styles.right)} onClick={clickRightArrow}><MdArrowForwardIos /></span>
        </div>
      </div>
    </div>
  )
}

export default Slider;
