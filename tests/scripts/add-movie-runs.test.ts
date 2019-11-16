import { removeImageFromTitle } from '../../src/scripts/add-movie-runs';

describe.only('#parseTitle', () => {
  it('should remove <img> tags from the movie title', () => {
    const badTitle =
      '<img src="//caribbeancinemas.com/xCXC.fw.png.pagespeed.ic.nmq7Eu0Dxa.png" width="53" height="25" alt=""/>\n' +
      '                                                  \n' +
      '                                                                                           \n' +
      '                                       Ford v Ferrari';

    const fixedTitle = removeImageFromTitle(badTitle);

    expect(fixedTitle).toEqual('Ford v Ferrari');
  });

  it('should not ruin already correct movie titles', () => {
    const correctTitle = 'Ford v Ferrari';

    const updatedTitle = removeImageFromTitle(correctTitle);

    expect(updatedTitle).toEqual(correctTitle);
  });
});
