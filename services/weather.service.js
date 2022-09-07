const { log } = console;
const axios = require('axios').default;

exports.getWeather = async (lat, lng) => {
  try {
    let weatherApi = process.env.WEATHER_API.replace('<<lat>>', `${lat}`);
    weatherApi = weatherApi.replace('<<lng>>', `${lng}`);

    const data = await axios.get(weatherApi);
    if (!data || !data.data) throw new Error('Weather is unavailable at the moment.');

    return {
      success: true,
      message: `lat: ${lat}, lng: ${lng}`,
      data: data.data,
    };
  } catch (error) {
    log({ WEATHER_SERVICE_ERROR: error.message });
    return {
      success: true,
      message: error.message,
    };
  }
};
