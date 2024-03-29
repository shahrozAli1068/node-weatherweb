const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1970d7581afdcda08e834ebccd65d77d/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. The high temprature for today is ' + body.daily.data[0].temperatureHigh + ' degree and the low temprature for today is ' + body.daily.data[0].temperatureLow + ' degree. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast