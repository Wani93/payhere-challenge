import React, { useEffect, useState } from 'react';
import Button from './Button';

const Pagenation = ({
  total,
  page,
  onClick,
}: {
  total: number;
  page: number;
  onClick: (newPage: number) => void;
}) => {
  const perPage = 10; // 페이지 당 개수
  const pageOffset = 5; // 페이지 간격
  const totalPage = Math.ceil(total / perPage); // 총 페이지 수

  const [pageInfo, setPageInfo] = useState({ start: 1, end: 10 });

  useEffect(() => {
    if (page - pageOffset <= 1) {
      setPageInfo({ start: 1, end: 10 });
    } else {
      setPageInfo({
        start: page - pageOffset,
        end: page + pageOffset >= totalPage ? totalPage : page + pageOffset,
      });
    }
  }, [page, total, totalPage]);

  return (
    <footer className="absolute left-1/3 bottom-5 flex justify-center mt-4 grid-rows-10">
      {Array(pageInfo.end - pageInfo.start + 1)
        .fill(pageInfo.start)
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
