import axios from 'axios';
import nowShowing from './now-showing';

const CC_HOME_PAGE = 'https://caribbeancinemas.com';

const instance = axios.create({
  baseURL: CC_HOME_PAGE,
  headers: { 'X-CC-API': 'https://github.com/rnegron/cc-api' },
});

(async () => {
  const results = await nowShowing(instance);
  console.log(results);
})();
