import { RootState, AppDispatch } from 'renderer/store/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type pageSizeType = {
  width: number | undefined;
  height: number | undefined;
};
export const usePageResize = () => {
  const [windowSize, setWindowSize] = useState<pageSizeType>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      // console.log(window.innerHeight)
      setWindowSize({
        width: window.innerHeight,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
};

export const useIntersectionObserver = ({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}: {
  root?: React.RefObject<HTMLDivElement>;
  target: React.RefObject<HTMLDivElement>;
  onIntersect: Function;
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
}) => {
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          // console.log(entry)
          entry.isIntersecting && onIntersect();
        }),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;
    if (!el) {
      return;
    }
    observer.observe(el);

    return () => observer.unobserve(el);
  }, [target.current, enabled]);
};

export const useClickAway = (ref: React.RefObject<any>, callback: Function) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref || !ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, callback]);
};
