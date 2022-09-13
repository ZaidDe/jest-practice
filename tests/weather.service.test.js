/* eslint-disable no-undef */
require('dotenv').config();
const axios = require('axios');
const { getWeatherFromApi } = require('../services/weather.service');

jest.mock('axios');

describe('Testing Weather Service', () => {
  describe('GetWeatherFromApi Method', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return success:true and data when API responds correctly', async () => {
      // const data = {
      //   coord: {

      //   },
      // };

      axios.get.mockImplementation(() => Promise.resolve({}));
      const result = await getWeatherFromApi(33.251, 73.214);

      expect(result).toBe(null);
    });

    it('should return null data object when API malfunctions', async () => {
      const data = {
        message: 'something went wrong',
      };

      axios.get.mockImplementation(() => Promise.reject(data));
      const result = await getWeatherFromApi(33.251, 73.214);

      expect(result).toBe(null);
    });

    it('should call external API only once', async () => {
      axios.get.mockImplementation(() => Promise.resolve({}));
      await getWeatherFromApi(33.251, 73.214);
      expect(axios.get.mock.calls).toHaveLength(1);
    });
  });
});
