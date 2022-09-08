const { log } = console;
const axios = require('axios').default;

const { WEATHER_API } = process.env;

exports.getWeather = async (lat, lng) => {
  try {
    const weatherApi = WEATHER_API.replace('<<lat>>', `${lat}`).replace('<<lng>>', `${lng}`);
    const data = await axios.get(weatherApi);
    if (!data || !data.data) {
      throw new Error('Weather is unavailable at the moment.');
    }

    return {
      success: true,
      message: `lat: ${lat}, lng: ${lng}`,
      data: data.data,
    };
  } catch (error) {
    log({ WEATHER_SERVICE_ERROR: error.message });
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};
