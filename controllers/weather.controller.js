const service = require('../services/weather.service')

const getWeather = async (lat, lng) => {

    if (isNaN(lat) || isNaN(lng)) return {
        success: false,
        message: 'Incorrect latitude or longitude'
    }

    lat = Number(lat)
    lng = Number(lng)

    const data = await service.getWeather(lat, lng)
    return data
}

module.exports = {
    getWeather
}