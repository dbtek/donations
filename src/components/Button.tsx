import * as React from 'react';

type ButtonProps = {
  children?: React.ReactChild | React.ReactChild[];
  primary?: boolean;
  className?: string;
  style?: {[key: string]: string};
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit';
}

export default function Button({ type, children, primary, className, style, onClick }: ButtonProps) {
  return (
    <button type={type} className={`btn${primary ? ' btn-primary' : ''} ${className || ''}`} style={style} onClick={onClick}>
      {children}
    </button>
  );
}