import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.module.scss';
import { useQuery } from 'react-query';
import { fetchLyricUrl } from 'renderer/api';
import { lyricParser } from '../../utils/lyricParser';
import { useAppSelector } from 'renderer/hooks/hooks';
import cx from 'classnames';
// import { useApp }
// import { fetch }

interface LyricProps {
  // url: string;
  id: number | undefined;
}

const Lyric: React.FC<LyricProps> = (props) => {
  const { id } = props;
  const { data } = useQuery(['fetchLyric', id], () => fetchLyricUrl(id!), {
    enabled: id !== undefined,
  });
  const curTime = useAppSelector((state) => state.music.curTime);
  const lyricText = data?.data.lrc.lyric;
  // console.log(lyricText);
  // const lines = useMemo(()=>lyricParser(lyricText), [id]);
  // console.log(lines);
  // let lines: {

  // }[] = [];
  // useEffect(() => {
  //   lines = lyricParser(lyricText);
  // }, [id])
  interface lineType {
    time: number;
    txt: string;
  }
  const [lines, setLines] = useState<lineType[]>([]);
  useEffect(() => {
    const parsedResult = lyricParser(lyricText);
    console.log('lrc parse sucees')
    // console.log(lyricText);
    // console.log(parsedResult);
    setLines(parsedResult);
  }, [id, lyricText]);
  // lines = lyricParser(lyricText);
  const lineIndex = lines.findIndex((line) => line.time >= curTime * 1000);
  // const activeLine = lines.findIndex(line => line.time >= curTime*1000)-1;
  const activeLine = lineIndex === -1 ? lines.length - 1 : lineIndex - 1;
  // console.log(activeLine)
  const offset = 160 - activeLine * 41;
  const lineClass = (index: number) =>
    cx(styles.lyricLine, {
      [styles.active]: activeLine === index,
    });
  return (
    // <div className={styles.lyricContainer}>

    <div className={styles.lyric}>
      <div
        className={styles.lyricInner}
        style={{
          transform: `translateY(${offset}px)`,
        }}
      >
        {!id || lines.length === 0 ? (
          <p className={styles.lyricLine}>暂无歌词</p>
        ) : (
          lines.map((line, index) => {
            return (
              <p className={lineClass(index)} key={index}>
                {line.txt}
              </p>
            );
          })
        )}
      </div>
    </div>
    // </div>
  );
};

export default Lyric;
