import addMovieRuns from './add-movie-runs';
import scrapeTheatres from './scrape-theatres';

const script = process.argv[2];
// const args = process.argv.splice(3, process.argv.length - 1);

(async () => {
  switch (script) {
    case 'add-movie-runs':
      await addMovieRuns();
      break;
    case 'scrape-theatres':
      await scrapeTheatres();
      break;
    default:
      break;
  }

  process.exit(0);
})();
