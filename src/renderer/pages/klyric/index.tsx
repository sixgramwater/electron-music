import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import { VscChromeClose } from 'react-icons/vsc';
import { closeHashWindow } from 'renderer/api/ipc';
import { findLastIndex } from 'renderer/utils';
// import { MdCloseFullscreen } from 'react-icons/md';

export type klyricLineType = {
  startTime: number;
  lineSpan: number;
  lineContent: {
    text: string;
    span: number;
    startTime: number;
  }[],
}

const KLyric = () => {
  useEffect(() => {
    window.electron.ipcRenderer.on('set-parsedLines', (event: any, arg: any) => {
      const parsed = arg;
      setParsedLines(parsed);
      console.log('parsed', parsed);
    });

    window.electron.ipcRenderer.on('set-curTime', (event: any, arg: any) => {
      const curTime = arg;
      setCurTime(curTime);
      // console.log(curTime);
    })
  }, [])
  const [showMask, setShowMask] = useState(false);
  const [parsedLines, setParsedLines] = useState<klyricLineType[]>([]);
  const [curTime, setCurTime] = useState(0);
  // let lastIndex = -1;
  const curLineIndex = parsedLines.length !== 0 ? findLastIndex(parsedLines, (line=>curTime >= line.startTime)) : -1;
  const curLine = curLineIndex !== -1 ? parsedLines[curLineIndex] : undefined;

  // const curLineIndex = parsedLines.findIndex((line) => curTime < line.startTime);
  // const curLine = parsedLines[curLineIndex];
  // const [curLine, setCurLine] = useState<klyricLineType>();
  // useEffect(() => {
  //   if(parsedLines.length === 0)  return;
  //   const cur = parsedLines.find((line) => curTime >= line.startTime);
  //   // if(cur)
  //   setCurLine(cur);
  // }, [curTime, parsedLines]);
  console.log(curLine);
  const handleMouseEnter = () => {
    setShowMask(true);
  }

  const handleMouseOut = () => {
    setShowMask(false);
  }
  const maskClass = cx(styles.klyricMask, {
    [styles.show]: showMask,
  });

  const handleClose = () => {
    closeHashWindow('klyric');
  }

  // const activeStyle =
  // const handle
  return (
    <div className={styles.klyric}>
      <div className={maskClass}  onMouseOut={handleMouseOut}>
        <div className={styles.controlBar}>
          <div className={styles.icon} onClick={handleClose}>
          <VscChromeClose />
          </div>
        </div>
      </div>
      <div className={styles.lyricContainer} onMouseEnter={handleMouseEnter}>
        {/* QQ音乐 听我想听 */}
        {
          curLine ?
          (
            curLine.lineContent.map((word, index) => {
              if(word.text === '')  return null;
              else {
                let percent;
                if(curTime < word.startTime) {
                  percent = 0;
                } else if(curTime > word.startTime + word.span) {
                  percent = 100;
                } else {
                  percent = (curTime-word.startTime) / word.span * 100;
                }
                return (
                  <span key={index} style={{
                    backgroundImage: `linear-gradient(to right, #ced720 ${percent}%,#35a3ed 0%)`
                  }}>
                    {word.text}
                  </span>
                )
              }
            })
          )
          : `QQ音乐 听我想听`
          // parsedLines.length === 0 ?

        }
        {/* <span></span> */}
      </div>
    </div>
  )
}

export default KLyric;
