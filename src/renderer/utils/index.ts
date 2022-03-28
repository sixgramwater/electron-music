export const group = (nums: any[]) => {
  if(!nums)  return undefined;
  let res = [];
  for(let i=0;i<nums.length; i+=2) {
    if(i+1>=nums.length)  break;
    res.push(nums.slice(i, i+2));
  }
  return res;
}

export const timeFormat = (time: number) => {
  // let temp = time.toFixed(0);
  time = (time / 1000) >> 0;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  const formatted = `${minutes.toFixed(0).padStart(2, '0')}:${seconds
    .toFixed(0)
    .padStart(2, '0')}`;
  return formatted;
};

// type predicateType = (value: any) => boolean;
export const findLastIndex = (array: any[], predicate: (value: any) => boolean) => {
  for(let i=array.length-1; i--; i>=0) {
    if(predicate(array[i])) {
      return i;
    }
  }
  return -1;
}
