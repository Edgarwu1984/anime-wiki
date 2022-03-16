import React from 'react';
import { FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

import Text from 'src/components/common/Text';

type MessageBoxProps = {
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
};

const MessageBox = ({ message, type }: MessageBoxProps): JSX.Element => {
  switch (type) {
    case 'info':
      return (
        <div className='relative flex items-center space-x-3 rounded-xl w-fit bg-blue-300/30 border-[1px] border-blue-400 text-blue-300 px-3 my-2'>
          <FaInfoCircle />
          <Text as='p' className='py-0 pr-4'>
            {message}
          </Text>
        </div>
      );
    case 'success':
      return (
        <div className='flex items-center space-x-3 rounded-xl w-fit bg-emerald-300/30 border-[1px] border-emerald-400 text-emerald-300 px-3 my-2'>
          <FaCheckCircle />
          <Text as='p' className='py-0'>
            {message}
          </Text>
        </div>
      );
    case 'error':
      return (
        <div className='flex items-center space-x-3 rounded-xl w-fit bg-rose-300/30 border-[1px] border-rose-400 text-rose-300 px-4 my-2'>
          <FaInfoCircle />
          <Text as='p' className='py-0'>
            {message}
          </Text>
        </div>
      );
    default:
      return (
        <div className='flex items-center space-x-3 rounded-xl w-fit bg-gray-300/30 border-[1px] border-gray-400 text-gray-300 px-3 my-2'>
          <FaInfoCircle />
          <Text as='p' className='py-0'>
            {message}
          </Text>
        </div>
      );
  }
};

export default MessageBox;
