import * as meow from 'meow';

import persistMovies from './utils/persist-movies';
import getMovieTitle from './utils/get-movie-title';
import persistTheatres from './utils/persist-theatres';

import { IMovieTaskData, ITheatreTaskData } from '../interfaces';

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

async function persist(
  input: string,
  results: IMovieTaskData[] | ITheatreTaskData
) {
  switch (input) {
    case Input.nowShowing:
      await persistMovies(results as IMovieTaskData[], {
        nowShowing: true,
        comingSoon: false,
      });
      break;
    case Input.comingSoon:
      await persistMovies(results as IMovieTaskData[], {
        nowShowing: false,
        comingSoon: true,
      });
      break;

    case Input.notShowing:
      await persistMovies(results as IMovieTaskData[], {
        nowShowing: false,
        comingSoon: false,
      });
      break;

    case Input.theatres:
      const { slugs, instance } = results as ITheatreTaskData;
      await persistTheatres(slugs, instance);
      break;

    default:
      break;
  }
}

async function log(
  input: string,
  results: IMovieTaskData[] | ITheatreTaskData
) {
  switch (input) {
    case Input.nowShowing:
    case Input.comingSoon:
    case Input.notShowing:
      for (const movieTask of results as IMovieTaskData[]) {
        console.log(getMovieTitle(movieTask));
      }
      break;

    case Input.theatres:
      const { slugs } = results as ITheatreTaskData;
      console.log(slugs);
      break;

    default:
      break;
  }
}

async function runTask(input: string, persistToDatabase: boolean) {
  let results;

  switch (input) {
    case Input.nowShowing:
      results = await getNowShowing();
      break;
    case Input.comingSoon:
      results = await getComingSoon();
      break;
    case Input.notShowing:
      results = await getNotShowing();
      break;
    case Input.theatres:
      results = await getMovieTheatres();
      break;

    case Input.movieRuns:
      if (persistToDatabase) {
        await addMovieRuns();
        process.exit(0);
      } else {
        console.log('Missing --persist flag.');
        process.exit(1);
      }

    default:
      console.log(cli.help);
      process.exit(0);
  }

  if (persistToDatabase && results) {
    await persist(input, results);
  } else if (results) {
    await log(input, results);
  }

  process.exit(0);
}

runTask(cli.input[0], cli.flags.persist ? true : false);
