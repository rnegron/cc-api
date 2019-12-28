import * as signale from 'signale';
import * as cheerio from 'cheerio';
import { AxiosInstance } from 'axios';

import dbConnect from '../../database';

import Theatre from '../../models/theatre';

async function getName(html: string) {
  const $ = cheerio.load(html);
  const name = $('h4').text();
  return name.trim();
}

async function getAddress(html: string) {
  const $ = cheerio.load(html);
  const address = $('li.address > p').text();
  return address.trim();
}

async function getPhone(html: string) {
  const $ = cheerio.load(html);
  const phone = $('li.phone > p').text();
  return phone.trim();
}

async function getAmenities(html: string) {
  const $ = cheerio.load(html);
  const amenitiesArr = $('ul > li')
    .last()
    .find('p')
    .children()
    .filter((_, elem) => $(elem).prop('title') !== undefined)
    .get();

  const amenities = await Promise.all(
    amenitiesArr.map((amenity) => Theatre.amenityMap($(amenity).prop('title')))
  );

  const amenitiesMapping: { [key: string]: boolean } = amenities.reduce(
    (accum: { [key: string]: boolean }, amenity: string) => {
      accum[amenity] = true;
      return accum;
    },
    {}
  );

  return amenitiesMapping;
}

async function getTheatreData(instance: AxiosInstance, slug: string) {
  const theatrePage = await instance.get(`/theatre/${slug}`);
  const $ = cheerio.load(theatrePage.data);
  const html = $('div.contact_box').html();

  if (!html) {
    throw new Error('Could not obtain theatre data: no HTML found');
  }

  try {
    const name = await getName(html);
    const address = await getAddress(html);
    const phone = await getPhone(html);
    const amenities = await getAmenities(html);
    slug = slug.trim().replace(/\//g, '');

    return { name, slug, address, phone, amenities };
  } catch (err) {
    throw new Error(`Could not obtain theatre data: ${err.message}`);
  }
}

export default async (theatreSlugs: string[], instance: AxiosInstance) => {
  const dbLog = new signale.Signale({ interactive: true, scope: 'db' });

  dbLog.await('Connecting to DB...');
  await dbConnect();
  dbLog.success('DB connection successful.');

  for (const theatreSlug of theatreSlugs) {
    // https://github.com/klaussinani/signale/issues/44#issuecomment-499476792
    console.log();

    const theatreLog = new signale.Signale({
      interactive: true,
      scope: `Theatre Slug: ${theatreSlug}`,
    });

    theatreLog.await(`Getting data for ${theatreSlug}...`);
    const data = await getTheatreData(instance, theatreSlug);

    const existingTheatre = await Theatre.findOneAndUpdate(
      { slug: data.slug },
      data
    ).exec();

    if (existingTheatre) {
      theatreLog.note(
        `Found existing Theatre ${existingTheatre.name} and updated it!`
      );
    } else {
      theatreLog.await(`Creating Theatre ${data.name}...`);
      const theatre = await Theatre.create(data);

      theatreLog.success(`${theatre.name} saved!`);
    }
  }
};
