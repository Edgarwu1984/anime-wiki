import { ComponentProps, ElementType, ReactNode } from 'react';
import './text.css';

type TextOwnProps<E extends ElementType> = {
  children: ReactNode;
  as?: E;
  className?: string;
};

type TextProps<E extends ElementType> = TextOwnProps<E> &
  Omit<ComponentProps<E>, keyof TextOwnProps<E>>;

const Text = <E extends ElementType = 'div'>({
  children,
  as,
  className,
}: TextProps<E>) => {
  const TextComponent = as || 'div';

  return <TextComponent className={className}>{children}</TextComponent>;
};

export default Text;
