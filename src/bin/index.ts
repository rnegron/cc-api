import axios from 'axios';
import nowShowing from './now-showing';
import { CC_URL, API_GIT_URL } from '../constants';

const instance = axios.create({
  baseURL: CC_URL,
  headers: { 'X-CC-API': API_GIT_URL },
});

(async () => {
  const results = await nowShowing(instance);
  console.log(results);
})();
