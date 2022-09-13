/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const { default: Redis } = require('ioredis');
const client = require('../store');

const { log } = console;
const GEO_INDEX = 'geopoints';

async function setValue(key = '', value = '') {
  try {
    if (key === '') throw new Error('Key is incorrect');
    await client.set(key, value);
    return true;
  } catch (error) {
    log(`[Redis Service][SetValue Fn Error] [${error.message}]`);
    return false;
  }
}

async function getValue(key = '') {
  try {
    if (key === '') throw new Error('Key is incorrect');
    const value = client.get(key);
    if (!value) throw new Error(`key: ${key} is not set.`);
    return value;
  } catch (error) {
    log(`[Redis Service][GetValue Fn Error] [${error.message}]`);
    return null;
  }
}

async function geoExists(lat, lng) {
  try {
    const foundGeoPoints = await client.georadius(GEO_INDEX, lng, lat, 100, 'km', 'ASC');
    if (!Array.isArray(foundGeoPoints) || foundGeoPoints.length === 0) return null;
    const poi = foundGeoPoints[0];
    const foundData = await client.get(poi);
    if (!foundData) return null;

    return JSON.parse(foundData);
  } catch (error) {
    log(`[Redis Service][GeoExists Fn Error] [${error.message}]`);
    return null;
  }
}

async function geoSet(lat, lng, data) {
  try {
    await client.geoadd(GEO_INDEX, lng, lat, `${lng}:${lat}`);
    await client.set(`${lng}:${lat}`, JSON.stringify(data), 'ex', 1200);

    return true;
  } catch (error) {
    log(`[Redis Service][GeoExists Fn Error] [${error.message}]`);
    return false;
  }
}

module.exports = {
  setValue,
  getValue,
  geoExists,
  geoSet,
};
