/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');

describe('Get Weather using latitude and longitude route.', () => {
  describe('Incorrect Latitude or Longitude in URL', () => {
    it('should return success:false', () => request(app).get('/weather/abc/xyz')
      .expect({ success: false, message: 'Incorrect latitude or longitude' }));
  });

  describe('Missing Latitude or Longitude in URL', () => {
    it('should return 404', () => request(app).get('/weather/73.2154')
      .expect(404));
  });

  describe('Correct Latitude and Longitude in URL', () => {
    it('should return success:true', async () => {
      const result = await request(app).get('/weather/33.2145/73.2356');
      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
    });
  });
});
