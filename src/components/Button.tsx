import React, { ReactNode } from 'react';

const Button = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className="p-1 bottom-1 border-gray-300 ">
      {children}
    </button>
  );
};

export default Button;
