import type { ReactNode } from 'react';

const List = ({
  type,
  children,
  onClick,
}: {
  type: 'primary' | 'loading' | 'error';
  children?: ReactNode;
  onClick?: () => void;
}) => {
  const colorMap = {
    primary: 'border-gray-300 hover:bg-sky-500',
    loading: 'border-neutral-500  bg-neutral-100',
    error: 'border-rose-500  bg-rose-100',
  };
  const color = colorMap[type];
  return (
    <li
      onClick={onClick}
      className={
        'flex justify-between p-3 text-base list-none border-2 bg-white rounded-lg w-1/3 ' +
        color
      }
    >
      {children}
    </li>
  );
};

export default List;
