import React from 'react';

interface Item {
  id: number;
  name: string;
}

interface Props {
  items: Item[];
  onClick: (newValue: Item) => void;
}

const DropDown = ({ items, onClick }: Props) => {
  return (
    <div className="w-1/3 mt-1">
      {items.map(({ id, name }) => (
        <li
          className="p-3 text-base list-none border-2 border-gray-300 rounded-lg hover:bg-sky-500 cursor-pointer"
          key={id}
          onClick={() => onClick({ id, name })}
        >
          {name}
        </li>
      ))}
    </div>
  );
};

export default DropDown;
export type { Props, Item };
