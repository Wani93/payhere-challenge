import React from 'react';
import List from './List';

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
    <div className="flex-col w-screen mt-1 absolute top-20 left-1/3">
      {items.map(({ id, name }) => (
        <List key={id} type="primary" onClick={() => onClick({ id, name })}>
          {name}
        </List>
      ))}
    </div>
  );
};

export default DropDown;
export type { Props, Item };
