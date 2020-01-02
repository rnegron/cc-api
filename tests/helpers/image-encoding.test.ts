import * as path from 'path';
import { promises as fs } from 'fs';
import { toBase64 } from '../../src/helpers/image-encoding';

describe('Image Encoding', () => {
  let poster = '';
  let base64EncodedPoster = '';

  beforeAll(async () => {
    poster = await fs.readFile(
      path.join(__dirname, '..', 'data', 'the_incredibles.jpg'),
      'binary'
    );

    base64EncodedPoster = await fs.readFile(
      path.join(__dirname, '..', 'data', 'the_incredibles.base64'),
      'utf-8'
    );
  });

  describe('#toBase64', () => {
    it('should encode a movie poster', () => {
      const encodedPoster = toBase64(poster, 'the_incredibles.jpg');

      expect(encodedPoster).toEqual(base64EncodedPoster);
    });
  });
});
