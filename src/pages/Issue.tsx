import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import List from '../components/presenters/List';
import Pagenation from '../components/presenters/Pagenation';
import useIssue from '../hooks/use-issue';

const Issue = () => {
  const { owner, repo } = useParams();
  const [page, setPage] = useState(1);
  const [loading, error, total, issues] = useIssue({
    page,
    owner: owner ?? '',
    repo: repo ?? '',
  });

  const hanldeClickRepo = (html_url: string) => {
    window.open(html_url);
  };

  const handleClickPage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Fragment>
      <h1 className="text-3xl mt-2 ml-2">
        {owner}/{repo}'s issues
      </h1>
      <div className="flex flex-col items-center">
        {loading && <List type="loading">...loading</List>}
        {error && <List type="error">{error}</List>}
      </div>

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

      <Pagenation total={total} page={page} onClick={handleClickPage} />
    </Fragment>
  );
};

export default Issue;
