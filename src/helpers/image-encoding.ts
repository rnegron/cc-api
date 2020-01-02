import * as path from 'path';

export function toBase64(data: string, filename: string) {
  const extname = path.extname(filename).substr(1);

  const buffer = Buffer.from(data, 'binary');
  return `data:image/${extname};base64,${buffer.toString('base64')}`;
}
