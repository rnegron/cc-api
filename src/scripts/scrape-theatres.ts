import axios, { AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';

import { CC_URL, API_GIT_URL } from '../constants';
import dbConnect from '../database';
import Theatre from '../models/theatre';

async function getTheatres(instance: AxiosInstance): Promise<string[]> {
  const homePage = await instance.get('/');

  const $ = cheerio.load(homePage.data);
  const theatreArr = $('.mfn-megamenu-5')
    .find('li.menu-item ')
    .nextAll()
    .map(
      (_, elem) =>
        $(elem)
          .find('li.menu-item a')
          .attr('href')
          .split('theater/')[1]
    )
    .get();

  return theatreArr;
}

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

  let amenitiesMapping: { [key: string]: boolean } = amenities.reduce(
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

(async () => {
  await dbConnect();

  const instance = axios.create({
    baseURL: CC_URL,
    headers: {
      'X-CC-API': API_GIT_URL,
      'User-Agent': `CC-API (${API_GIT_URL})`,
    },
  });

  let theatreSlugs = await getTheatres(instance);

  for (let theatreSlug of theatreSlugs) {
    console.log(`Getting data for ${theatreSlug}...`);
    const data = await getTheatreData(instance, theatreSlug);

    const existingTheatre = await Theatre.findOneAndUpdate(
      { slug: data.slug },
      data
    ).exec();

    if (existingTheatre) {
      console.log(
        `Found existing Theatre ${existingTheatre.name} and updated it!`
      );
    } else {
      console.log(`Creating Theatre ${data.name}...`);
      const theatre = new Theatre(data);
      await theatre.save();

      console.log(`${theatre.name} saved!`);
    }
  }

  process.exit(0);
})();
