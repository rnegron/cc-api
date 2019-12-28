import { get, omit } from 'lodash';

import { testServer } from '../setup';

import Theatre, { ITheatre } from '../../src/models/theatre';

describe('GET /theatres', () => {
  afterEach(() => Theatre.deleteMany({}));

  it('returns 200 on success', async () => {
    const res = await testServer.inject({
      method: 'GET',
      url: '/theatres',
    });
    expect(res.statusCode).toEqual(200);
  });

  it('returns serialized theatres', async () => {
    const boilerplateTheatre = {
      city: 'Test City',
      address: '123 Test Ave',
      phone: '123-456-7890',
      amenities: {
        cxc: false,
        imax: false,
        '3d': false,
        '4dx': false,
        atm: false,
        accessible: false,
        partyRoom: false,
        gameRoom: false,
        stadiumTheatre: false,
        powerGenerator: false,
      },
      runs: [],
    };

    const theatreA = await Theatre.create({
      name: 'Theatre A',
      slug: 'theatre-a',
      ...boilerplateTheatre,
    });

    const theatreB = await Theatre.create({
      name: 'Theatre B',
      slug: 'theatre-b',
      ...boilerplateTheatre,
    });

    const res = await testServer.inject({
      method: 'GET',
      url: '/theatres',
    });

    expect(get(res.result, 'data')).toHaveLength(2);

    expect(res.result).toEqual({
      data: expect.arrayContaining([
        {
          type: 'theatres',
          attributes: omit(theatreA.toJSON(), ['_id', '__v']),
        },
        {
          type: 'theatres',
          attributes: omit(theatreB.toJSON(), ['_id', '__v']),
        },
      ]),
    });
  });
});

describe('GET /theatres/:theatreSlug', () => {
  let testTheatre: ITheatre;

  beforeEach(async () => {
    testTheatre = await Theatre.create({
      name: 'Theatre A',
      slug: 'theatre-a',
      city: 'Test City',
      address: '123 Test Ave',
      phone: '123-456-7890',
      amenities: {
        cxc: false,
        imax: false,
        '3d': false,
        '4dx': false,
        atm: false,
        accessible: false,
        partyRoom: false,
        gameRoom: false,
        stadiumTheatre: false,
        powerGenerator: false,
      },
      runs: [],
    });
  });

  afterEach(() => Theatre.deleteMany({}));

  it('returns 200 on success', async () => {
    const res = await testServer.inject({
      method: 'GET',
      url: `/theatres/${testTheatre.slug}`,
    });

    expect(res.statusCode).toEqual(200);
  });

  it('returns 404 on not found', async () => {
    const res = await testServer.inject({
      method: 'GET',
      url: '/theatres/fake-theatre',
    });
    expect(res.statusCode).toEqual(404);
  });

  it('returns serialized theatre', async () => {
    const res = await testServer.inject({
      method: 'GET',
      url: `/theatres/${testTheatre.slug}`,
    });

    expect(res.result).toEqual({
      data: {
        type: 'theatres',
        attributes: omit(testTheatre.toJSON(), ['_id', '__v']),
      },
    });
  });
});
