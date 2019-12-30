import * as meow from 'meow';

import persistMovies from './utils/persist-movies';
import getMovieTitle from './utils/get-movie-title';
import persistTheatres from './utils/persist-theatres';

import addMovieRuns from '../scripts/add-movie-runs';
import { getMovieTheatres } from '../scripts/scrape-theatres';
import { getNotShowing } from '../scripts/movies-not-in-theatres';
import { getNowShowing, getComingSoon } from '../scripts/scrape-movies';

enum Input {
  comingSoon = 'get-coming-soon',
  movieRuns = 'add-movie-runs',
  notShowing = 'get-not-showing',
  nowShowing = 'get-now-showing',
  theatres = 'get-movie-theatres',
}

const cli = meow(
  `
  Usage
    $ yarn task input [options]
    
  Input
    add-movie-runs          
    get-coming-soon         Scrape movies coming soon
    get-movie-theatres      Scrape movie theatres
    get-not-showing         Show movies in database that are no longer in theatres
    get-now-showing         Scrape movies now showing
  
  Options
    --persist               Store results in database 

  Examples
    $ yarn task get-now-showing
    $ yarn task add-movie-runs --persist
`
);

(async () => {
  const persistToDatabase = cli.flags.persist ? true : false;

  const input = cli.input[0];

  if (input === Input.nowShowing) {
    const results = await getNowShowing();

    if (persistToDatabase) {
      await persistMovies(results, { nowShowing: true, comingSoon: false });
    } else {
      console.log(results.map((movieTask) => getMovieTitle(movieTask)));
    }
  } else if (input === Input.comingSoon) {
    const results = await getComingSoon();

    if (persistToDatabase) {
      await persistMovies(results, { nowShowing: false, comingSoon: true });
    } else {
      console.log(results.map((movieTask) => getMovieTitle(movieTask)));
    }
  } else if (input === Input.notShowing) {
    const results = await getNotShowing();
    if (persistToDatabase) {
      await persistMovies(results, { nowShowing: false, comingSoon: false });
    } else {
      console.log(results.map((movieTask) => getMovieTitle(movieTask)));
    }
  } else if (input === Input.theatres) {
    const { slugs, instance } = await getMovieTheatres();
    if (persistToDatabase) {
      await persistTheatres(slugs, instance);
    } else {
      console.log(slugs);
    }
  } else if (input === Input.movieRuns) {
    if (persistToDatabase) {
      await addMovieRuns();
    } else {
      console.log('Missing --persist flag.');
    }
  } else {
    console.log(cli.help);
  }

  process.exit(0);
})();
