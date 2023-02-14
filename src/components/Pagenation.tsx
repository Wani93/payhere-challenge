import React, { useEffect, useState } from 'react';
import Button from './Button';

const Pagenation = ({
  total,
  page,
  per_page,
  onClick,
}: {
  total: number;
  page: number;
  per_page: number;
  onClick: (newPage: number) => void;
}) => {
  const [pages, setPages] = useState(0);

  useEffect(() => {
    if (page <= 5) {
      setPages(1);
    } else if (page + 5 >= total) {
      setPages(page - 10);
    } else {
      setPages(page - 5);
    }
  }, [page, total]);

  return (
    <footer className="flex justify-center mt-4 grid-rows-10">
      {Array(10)
        .fill(pages)
        .map((value, idx) => (
          <Button key={value + idx} onClick={() => onClick(value + idx)}>
            <p className={page === value + idx ? 'text-sky-400 font-bold' : ''}>
              {value + idx}
            </p>
          </Button>
        ))}
    </footer>
  );
};

export default Pagenation;
