import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import searchService from '../services/search';

const Issue = () => {
  const { owner, repo } = useParams();
  const [currentPage] = useState(1);
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    searchService
      .getIssues({
        q: `is:issue repo:${owner}/${repo}`,
        per_page: 10,
        page: currentPage,
      })
      .then((value) => {
        setIssues(
          value.data.items.map(({ id, title, html_url }) => ({
            id,
            title,
            html_url,
          })),
        );
      });
  }, [currentPage, owner, repo]);

  return (
    <Fragment>
      {issues.map(({ id, title, html_url }) => (
        <li key={id}>
          <a href={html_url}>{title}</a>
        </li>
      ))}
    </Fragment>
  );
};

export default Issue;
