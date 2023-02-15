import React, { ChangeEvent, useState } from 'react';
import useDeboundcing from '../../hooks/use-debouncing';
import DropDown from '../presenters/Dropdown';
import useRepository from '../../hooks/use-repository';
import List from '../presenters/List';
import type { Item } from '../presenters/Dropdown';

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
    <div className="flex flex-col items-center mt-16 relative">
      <input
        type="text"
        className="p-5 border-solid border-2 rounded-xl border-gray-300 outline-sky-600 hover:border-sky-500 w-1/3 text-lg"
        onChange={handleChange}
      />
      {loading && <List type="loading">...loading</List>}
      {error && <List type="error">{error}</List>}
      <DropDown items={repositories} onClick={handleClick} />
    </div>
  );
};

export default RepositorySelect;
