import { useEffect, useState } from 'react';
import searchService from '../services/search';
import type { Props } from '../components/presenters/Dropdown';

const useRepository = (search: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [repositories, setRepositories] = useState<Props['items']>([]);

  useEffect(() => {
    if (!search) {
      return;
    }

    setLoading(true);

    searchService
      .getRepositories({
        q: search,
        per_page: 10,
      })
      .then(({ data }) => {
        setRepositories(
          data.items.map(({ id, full_name }) => ({
            id,
            name: full_name,
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
      setRepositories([]);
      setError('');
    };
  }, [search]);

  return [loading, error, repositories] as [boolean, string, Props['items']];
};

export default useRepository;
