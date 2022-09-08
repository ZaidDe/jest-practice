/* eslint-disable no-undef */
require('dotenv').config();
const axios = require('axios');
const { getWeather } = require('../services/weather.service');

jest.mock('axios');

describe('Testing Weather Service', () => {
  describe('GetWeather Method', () => {
    it('should return success:true and data when API responds correctly', async () => {
      const response = {
        success: true,
        message: 'some Message',
        data: {
          coord: {

          },
        },
      };

      axios.get.mockImplementation(() => Promise.resolve(response));
      const result = await getWeather(33.251, 73.214);

      expect(result.success).toBe(true);
      expect(result.data).not.toBe(null);
    });

    it('should return success:false and empty data object when API malfunctions', async () => {
      const response = {
        success: false,
        message: 'some Message',
        data: null,
      };

      axios.get.mockImplementation(() => Promise.reject(response));
      const result = await getWeather(33.251, 73.214);

      expect(result.success).toBe(false);
      expect(result.data).toBe(null);
    });
  });
});
