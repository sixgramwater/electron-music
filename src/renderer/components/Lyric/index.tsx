import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.module.scss';
import { useQuery } from 'react-query';
import { fetchLyricUrl } from 'renderer/api';
import { kLyricParser, lyricParser } from '../../utils/lyricParser';
import { useAppSelector } from 'renderer/hooks/hooks';
import cx from 'classnames';
import { klyricLineType } from 'renderer/pages/klyric';
// import { useApp }
// import { fetch }

interface LyricProps {
  // url: string;
  id: number | undefined;
}

type LyricResType = {
  lrc: {
    version: number,
    lyric: string,
  },
  klyric: {
    version: number,
    lyric: string
  }
}
const Lyric: React.FC<LyricProps> = (props) => {
  const { id } = props;
  const { data } = useQuery<LyricResType>(['fetchLyric', id], () => fetchLyricUrl(id!).then(res => res.data), {
    enabled: id !== undefined,
  });
  const curTime = useAppSelector((state) => state.music.curTime);
  const showKlyric = useAppSelector((state) => state.app.showKlyric);
  const lyricText = data?.lrc?.lyric;
  const klyricText = data?.klyric?.lyric;
  const [parsedKlyricLines, setParsedKlyricLines] = useState<klyricLineType[]>([])
  // const parsedKlyricLines = useMemo(() => kLyricParser(klyricText)
  // , [id]);

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
    if(showKlyric) {
      console.log('send')
      window.electron.ipcRenderer.send('send-parsedLines', parsedKlyricLines);
      setTimeout(() => {
      window.electron.ipcRenderer.send('send-parsedLines', parsedKlyricLines);

      }, 1500);
    }
  }, [showKlyric, parsedKlyricLines]);

  useEffect(() => {
    if(showKlyric) {
      window.electron.ipcRenderer.send('send-curTime', curTime*1000);
    }
  }, [showKlyric, curTime])
  useEffect(() => {
    if(!lyricText)  return;
    const parsedResult = lyricParser(lyricText);
    console.log('lrc parse sucees')
    // console.log(lyricText);
    // console.log(parsedResult);
    setLines(parsedResult);
  }, [id, lyricText]);
  useEffect(() => {
    if(!klyricText)  return;
    const parsed = kLyricParser(klyricText);
    setParsedKlyricLines(parsed);
    console.log(parsed);
  }, [id, klyricText])
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
