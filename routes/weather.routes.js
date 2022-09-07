const router = require('express').Router();
const { getWeather } = require('../controllers/weather.controller')


router.get('/:lat/:lng', async (req, res) => {
    const result = await getWeather(req.params.lat, req.params.lng);
    res.send(result)
})

module.exports = router;
