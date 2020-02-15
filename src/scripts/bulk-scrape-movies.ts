// import axios from 'axios';
// import * as cheerio from 'cheerio';

// import { IMovieTaskData } from '../interfaces';
// import persistMovies from '../tasks/utils/persist-movies';

// import { CC_URL, API_GIT_URL } from '../constants';

// async () => {
//   const instance = axios.create({
//     baseURL: CC_URL,
//     headers: { 'X-CC-API': API_GIT_URL },
//   });

//   try {
//     const page = await instance.get(moviePath);
//     const movieHtml = cheerio.load(page.data).html() || '';
//     const movieId = moviePath.split('movie/')[1].replace('/', '');

//     results.push({ movieId, movieHtml });
//   } catch (err) {
//     console.error(`Could not get ${moviePath}: ${err.message}`);
//   }
// };
