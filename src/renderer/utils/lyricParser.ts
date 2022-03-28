const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

// const tagRegMap = {
//   title: 'ti',
//   artist: 'ar',
//   album: 'al',
//   offset: 'offset',
//   by: 'by'
// }

export const lyricParser = (lyric: string) => {
  if (!lyric) return [];
  // console.log(lyric);
  const lines = lyric.split('\n');
  let parsedLines = [];
  const offset = 0;
  for (let i = 0; i < lines.length; i++) {
    // debugger
    const line = lines[i];
    const result: any = timeExp.exec(line);
    if (result) {
      const txt = line.replace(timeExp, '').trim();
      const tirdResult = result[3] || 0;
      const length = tirdResult.length;
      let __tirdResult = parseInt(tirdResult, 10);
      __tirdResult =
        length > 2 && __tirdResult < 100
          ? __tirdResult
          : __tirdResult > 99
          ? __tirdResult
          : __tirdResult * 10;
      if (txt) {
        parsedLines.push({
          time:
            result[1] * 60 * 1000 + result[2] * 1000 + __tirdResult + offset,
          txt,
        });
      }
    }
  }
  // console.log(parsedLines);
  parsedLines.sort((a, b) => {
    return a.time - b.time;
  });
  return parsedLines;
};



const spanExp = /\(\d+,(\d+)\)([\u4E00-\u9FA5A-Za-z0-9]?)/g;
const lineSpanExp = /^\[(\d+),(\d+)\]/g;
// const kTimeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;
export const kLyricParser = (lyric: string) => {
  if(!lyric)  return [];
  const lines = lyric.split('\n');
  let parsedLines = [];
  // const offset = 0;
  for(let i=0; i< lines.length; i++) {
    const line = lines[i];
    const lineResult = [...line.matchAll(lineSpanExp)];
    if(lineResult.length !== 0) {
      const lineSpans = lineResult[0];
      const lineStartTime = parseInt(lineSpans[1]);
      const lineSpan = parseInt(lineSpans[2]);
      const result = [...line.matchAll(spanExp)];
      let lastStartTime = lineStartTime;
      const lineContent = result.map((item) => {
        const st = lastStartTime;
        const sp = parseInt(item[1]);
        lastStartTime += sp;
        return {
          text: item[2],
          span: sp,
          startTime: st,
        }
      });

      parsedLines.push({
        startTime: lineStartTime,
        lineSpan: lineSpan,
        lineContent
      })
    }
  }
  return parsedLines;
}
