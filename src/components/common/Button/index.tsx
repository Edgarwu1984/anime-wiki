import { ComponentProps, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import './button.css';

// Initialize the Base Props
interface BaseProps {
  children: ReactNode | string;
  className?: string | '';
  size?: 'sm' | 'lg';
}

/* 
Use Omit to construct a type by picking all properties from Type and then removing Keys (string literal or union of string literals).
Example: https://www.typescriptlang.org/docs/handbook/utility-types.html
*/
// keyof means union type; keyof BaseProps = text | className

// 1).Button Type
type ButtonAsButton = BaseProps &
  Omit<ComponentProps<'button'>, keyof BaseProps> & {
    as: 'button';
  };

// 2).React Link Type
type ButtonAsLink = BaseProps &
  Omit<LinkProps, keyof BaseProps> & { as: 'link' };

// 3).Anchor Link Type
type ButtonAsExternalLink = BaseProps &
  Omit<ComponentProps<'a'>, keyof BaseProps> & {
    as: 'externalLink';
  };

// Combine all the types
type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsExternalLink;

const Button = (props: ButtonProps) => {
  // Destructuring BaseProps that we mainly needed.
  const { children, className = '', as, size, ...rest } = props;

  const btnSizeClassName =
    size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';

  return (
    <>
      {as === 'button' && (
        // Need use the 'as' key word to specify props type for rest of the props
        <button
          className={`btn ${className} ${btnSizeClassName}`}
          size={size}
          {...(rest as ButtonAsButton)}
        >
          {children}
        </button>
      )}
      {as === 'link' && (
        <Link
          className={`btn ${className} ${btnSizeClassName}`}
          size={size}
          {...(rest as ButtonAsLink)}
        >
          {children}
        </Link>
      )}
      {as === 'externalLink' && (
        <a
          className={`btn ${className} ${btnSizeClassName}`}
          target='_blank'
          rel='noreferrer'
          size={size}
          {...(rest as ButtonAsExternalLink)}
        >
          {children}
        </a>
      )}
    </>
  );
};

export default Button;
