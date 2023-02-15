import React from 'react';
import type { ReactNode } from 'react';

const Button = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className="mr-1 py-1 px-3 rounded bg-slate-200">
      {children}
    </button>
  );
};

export default Button;
