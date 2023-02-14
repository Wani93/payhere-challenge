import { Fragment, useState } from 'react';
import RepositoryList from '../components/RepositoryList';
import RepositorySelect from '../components/RepositorySelect';
import type { Item, Props } from '../components/Dropdown';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const savedData = JSON.parse(
    window.localStorage.getItem('repositories') ?? '[]',
  );
  const [savedRepositories, setSavedReoisitories] =
    useState<Props['items']>(savedData);

  const saveRepository = (newValue: Item) => {
    if (savedRepositories.length === 4) {
      alert('저장소는 최대 4개까지 등록할 수 있습니다.');
      return;
    }

    setSavedReoisitories((prev) => {
      const repositories = [newValue, ...prev];
      window.localStorage.setItem('repositories', JSON.stringify(repositories));
      return repositories;
    });
  };

  const handleClickRepo = (name: string) => {
    // 페이지 이동
    // 이동한 페이지에서 page 1로 이슈 조회
    const [owner, repo] = name.split('/');
    navigate(`/issues/${owner}/${repo}`);
  };

  const handleClickDelete = (id: number) => {
    const newRepos = savedRepositories.filter((value) => {
      return value.id !== id;
    });

    window.localStorage.setItem('repositories', JSON.stringify(newRepos));
    setSavedReoisitories(newRepos);
  };

  return (
    <Fragment>
      <RepositorySelect onClick={saveRepository} />
      <RepositoryList
        repositories={savedRepositories}
        onClickRepo={handleClickRepo}
        onClickDelete={handleClickDelete}
      />
    </Fragment>
  );
};

export default Home;
