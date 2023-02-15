import { useEffect, useState } from 'react';
import searchService from '../services/search';

interface Issue {
  id: number;
  title: string;
  html_url: string;
}

const useIssue = ({
  page,
  owner,
  repo,
}: {
  page: number;
  owner: string;
  repo: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    setLoading(true);

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
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      setIssues([]);
    };
  }, [page, owner, repo]);

  return [loading, error, total, issues] as [boolean, string, number, Issue[]];
};

export default useIssue;
