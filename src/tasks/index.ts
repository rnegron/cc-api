#!/usr/bin/env node

import axios from 'axios';
import * as meow from 'meow';
import nowShowingOrComingSoonTask, { Options } from './now-soon-scrape';

import { CC_URL, API_GIT_URL } from '../constants';

const cli = meow(
  `
  Usage
    $ ts-node src/tasks
    
  Options
    --now-showing, --now  Scrape the now showing movies
    --coming-soon, --soon Scrape the coming soon movies

  Examples
    $ ts-node src/tasks --now-showing
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

  console.log(results);
})();
