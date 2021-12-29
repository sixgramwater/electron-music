// import { Scrollbar } from 'react-scrollbars-custom';
import { Scrollbars } from 'react-custom-scrollbars';
import React from 'react';

const Scroll: React.FC = (props) => {
  const {
    children
  } = props;
  return (
    <Scrollbars
      // height={`calc(100vh - 64px)`}
      style={{
        height: `calc(100vh - 128px)`
      }}
      children={children}
    />
  )
}

export default Scroll