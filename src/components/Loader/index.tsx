import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <ThreeCircles
        color='#0ba5e9'
        outerCircleColor='#456978'
        innerCircleColor='#456978'
      />
    </div>
  );
};

export default Loader;
