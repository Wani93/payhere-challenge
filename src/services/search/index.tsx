import axios, { AxiosResponse } from 'axios';
import type {
  ReqGetIssues,
  ReqGetRepositories,
  ResGetIssues,
  ResGetRepositories,
} from './types';

const apiClient = axios.create({
  baseURL: 'https://api.github.com/search',
});

const searchService = {
  getRepositories: (
    params: ReqGetRepositories,
  ): Promise<AxiosResponse<ResGetRepositories>> =>
    apiClient.get('/repositories', { params }),
  getIssues: (params: ReqGetIssues): Promise<AxiosResponse<ResGetIssues>> =>
    apiClient.get('/issues', { params }),
};

export default searchService;
