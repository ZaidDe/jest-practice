const { log } = console;
const axios = require('axios').default;
const redisService = require('./redis.service');

const { WEATHER_API } = process.env;

async function getWeatherFromApi(lat, lng) {
  try {
    const weatherApi = WEATHER_API.replace('<<lat>>', `${lat}`).replace('<<lng>>', `${lng}`);
    const result = await axios.get(weatherApi);
    if (!result || !result.data) {
      throw new Error('Weather is unavailable at the moment.');
    }

    return result.data;
  } catch (error) {
    log(`[WEATHER SERVICE] [getWeatherFromApi Error] [${error.message}]`);
    return null;
  }
}

async function getWeather(lat, lng) {
  try {
    const cachedData = await redisService.geoExists(lat, lng);
    if (cachedData !== null) {
      // log('CACHE HIT !!');
      return {
        success: true,
        message: `lat: ${lat}, lng: ${lng}`,
        data: cachedData,
      };
    }

    // log('CACHE MISS !!');
    const data = await getWeatherFromApi(lat, lng);
    if (data === null) throw new Error('Weather is not available at the moment.');
    await redisService.geoSet(lat, lng, data);

    return {
      success: true,
      message: `lat: ${lat}, lng: ${lng}`,
      data,
    };
  } catch (error) {
    log(`[WEATHER SERVICE] [getWeather Error] [${error.message}]`);
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
}

module.exports = {
  getWeather,
  getWeatherFromApi,
};
