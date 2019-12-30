import parseRedisUrl from '../../src/helpers/parse-redis-url';

describe('#parseRedisUrl', () => {
  it('should return an empty object if sent null', () => {
    const result = parseRedisUrl(null);
    expect(result).toEqual({});
  });

  it('should parse the URL with credentials into each component', () => {
    const result = parseRedisUrl('redis://user:pass@host:1234');
    expect(result).toEqual({
      host: 'host',
      user: 'user',
      password: 'pass',
      port: '1234',
    });
  });

  it('should parse the URL without credentials into each component', () => {
    const result = parseRedisUrl('redis://host:1234');
    expect(result).toEqual({
      host: 'host',
      user: '',
      password: '',
      port: '1234',
    });
  });
});
