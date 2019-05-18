#!/usr/bin/env node

import axios from 'axios';
import * as meow from 'meow';

import saveToDB from './helpers/save-to-db';
import nowShowingOrComingSoonTask, { Options } from './scrape-features-movies';
import { getTitle } from '../../src/helpers/get-movie-data';

import { CC_URL, API_GIT_URL } from '../constants';

const cli = meow(
  `
  Usage
    $ ts-node src/tasks
    
  Options
    --now-showing, --now    Scrape movies now showing
    --coming-soon, --soon   Scrape movies coming soon
    --save,                 Store results in MongoDB

  Examples
    $ ts-node src/tasks --now --save
`,
  {
    flags: {
      nowShowing: {
        type: 'boolean',
        alias: 'now',
      },
      comingSoon: {
        type: 'boolean',
        alias: 'soon',
      },
      save: {
        type: 'boolean',
      },
    },
  }
);

const instance = axios.create({
  baseURL: CC_URL,
  headers: { 'X-CC-API': API_GIT_URL },
});

(async () => {
  let choice;

  if (cli.flags.nowShowing) {
    choice = Options.nowShowingUrl;
  } else if (cli.flags.comingSoon) {
    choice = Options.comingSoonUrl;
  } else {
    console.log(cli.help);
    return;
  }

  const results = await nowShowingOrComingSoonTask(instance, choice);

  if (cli.flags.save) {
    try {
      await saveToDB(results, cli.flags);
      console.log('Data saved!');
      process.exit(0);
    } catch (err) {
      console.log(`Error: ${err}`);
      process.exit(1);
    }
  } else {
    console.log(results.map((movie) => getTitle(movie.movieHtml)));
  }
})();
