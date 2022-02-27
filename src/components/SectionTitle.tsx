import React from 'react';
import Text from './common/Text';

type SectionTitleProps = {
  title: string;
};

const SectionTitle = ({ title = 'Section Title' }: SectionTitleProps) => {
  return (
    <Text as='h4' className='text-sky-500 font-title mb-6'>
      {title}
    </Text>
  );
};

export default SectionTitle;
