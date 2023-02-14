import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import List from '../components/List';
import searchService from '../services/search';

const Issue = () => {
  const { owner, repo } = useParams();
  const [currentPage] = useState(1);
  const [issues, setIssues] = useState<any[]>([]);
  const hanldeClick = (html_url: string) => {
    window.open(html_url);
  };
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
      <h1 className="text-3xl mt-2 ml-2">
        {owner}/{repo}'s issues
      </h1>
      <div className="flex flex-col items-center mt-16">
        {issues.map(({ id, title, html_url }) => (
          <List type="primary" key={id}>
            <p className="cursor-pointer" onClick={() => hanldeClick(html_url)}>
              {title}
            </p>
          </List>
        ))}
      </div>
    </Fragment>
  );
};

export default Issue;
