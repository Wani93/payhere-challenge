import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import List from '../components/List';
import Pagenation from '../components/Pagenation';
import searchService from '../services/search';

const Issue = () => {
  const { owner, repo } = useParams();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [issues, setIssues] = useState<any[]>([]);

  const hanldeClickRepo = (html_url: string) => {
    window.open(html_url);
  };

  const handleClickPage = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    searchService
      .getIssues({
        q: `is:issue repo:${owner}/${repo}`,
        per_page: 10,
        page,
      })
      .then((value) => {
        setTotal(value.data.total_count);
        setIssues(
          value.data.items.map(({ id, title, html_url }) => ({
            id,
            title,
            html_url,
          })),
        );
      });
  }, [page, owner, repo]);

  return (
    <Fragment>
      <h1 className="text-3xl mt-2 ml-2">
        {owner}/{repo}'s issues
      </h1>
      <div className="flex flex-col items-center mt-16">
        {issues.map(({ id, title, html_url }) => (
          <List type="primary" key={id}>
            <p
              className="cursor-pointer"
              onClick={() => hanldeClickRepo(html_url)}
            >
              {title}
            </p>
          </List>
        ))}
      </div>

      <Pagenation
        total={total}
        per_page={10}
        page={page}
        onClick={handleClickPage}
      />
    </Fragment>
  );
};

export default Issue;
