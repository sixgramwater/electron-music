import { RootState, AppDispatch } from "renderer/store/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type pageSizeType = {
  width: number | undefined;
  height: number | undefined;
}
export const usePageResize = () => {
  const [windowSize, setWindowSize] = useState<pageSizeType>({
    width: undefined,
    height: undefined,
  });

  useEffect(()=>{
    const handleResize = () => {
      // console.log(window.innerHeight)
      setWindowSize({
        width: window.innerHeight,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [])
  return windowSize;
}