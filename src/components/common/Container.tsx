import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={`container mx-auto px-4 py-[4rem] ${className} md:px-4 lg:px-2`}
    >
      {children}
    </div>
  );
};

export default Container;
