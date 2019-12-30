import Theatre from '../../src/models/theatre';

describe('Models: Movie', () => {
  afterEach(() => Theatre.deleteMany({}));

  describe('#amenityMap', () => {
    const mapping = [
      ['ATM', 'atm'],
      ['3D', '3d'],
      ['IMAX', 'imax'],
      ['Caribbean Cinemas Extreme', 'cxc'],
      ['4DX', '4dx'],
      ['Game Room', 'gameRoom'],
      ['Party Room', 'partyRoom'],
      ['Sala Tipo Stadium', 'stadiumTheatre'],
      ['Planta Eléctrica', 'powerGenerator'],
      ['', 'accessible'],
    ];

    it.each(mapping)('case %s', (item, expected) => {
      expect(Theatre.amenityMap(item)).toEqual(expected);
    });

    it('should throw with escaped HTML on unrecognized amenity', () => {
      try {
        Theatre.amenityMap('<b>test</b>');
      } catch (err) {
        expect(err.message).toEqual(
          'Unrecognized amenity: &lt;b&gt;test&lt;&#x2f;b&gt;'
        );
      }
    });
  });
});
