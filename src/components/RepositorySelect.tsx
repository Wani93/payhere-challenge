import React, { ChangeEvent, useState } from 'react';
import useDeboundcing from '../hooks/use-debouncing';
import DropDown from './Dropdown';
import type { Item } from './Dropdown';
import useRepository from '../hooks/use-repository';

const RepositorySelect = ({
  onClick,
}: {
  onClick: (newValue: Item) => void;
}) => {
  const [search, setSearch] = useState('');
  const [loading, error, repositories] = useRepository(search);

  const [debouncing] = useDeboundcing(setSearch, 500);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    debouncing(e.target.value);
  };

  const handleClick = (newValue: Item) => {
    setSearch('');
    onClick(newValue);
  };

  return (
    <div className="flex flex-col items-center mt-16">
      <input
        type="text"
        className="p-5 border-solid border-2 rounded-xl border-gray-300 outline-sky-600 hover:border-sky-500 w-1/3 text-lg"
        onChange={handleChange}
      />
      {loading && (
        <li className="p-3 text-base list-none border-2 rounded-lg border-neutral-500  bg-neutral-100 w-1/3">
          ...loading
        </li>
      )}
      {error && (
        <li className="p-3 text-base list-none border-2 rounded-lg border-rose-500  bg-rose-100 w-1/3">
          {error}
        </li>
      )}
      <DropDown items={repositories} onClick={handleClick} />
    </div>
  );
};

export default RepositorySelect;
