// import { Scrollbar } from 'react-scrollbars-custom';
import { Scrollbars } from 'react-custom-scrollbars';
import React from 'react';

interface ScrollProps {
  height?: string;
}

const Scroll: React.FC<ScrollProps> = (props) => {
  const { height } = props;
  const { children } = props;
  return (
    <Scrollbars
      // height={`calc(100vh - 64px)`}
      style={{
        height: height ? height : `calc(100vh - 128px)`,
      }}
      children={children}
    />
  );
};

export default Scroll;
