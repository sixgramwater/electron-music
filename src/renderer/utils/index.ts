export const group = (nums: any[]) => {
  if(!nums)  return undefined;
  let res = [];
  for(let i=0;i<nums.length; i+=2) {
    if(i+1>=nums.length)  break;
    res.push(nums.slice(i, i+2));
  }
  return res;
}
