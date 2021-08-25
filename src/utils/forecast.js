const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=120fab5529364005f803a0276f72fd79&query=${longitude},${latitude}&units=m`;
    request({ url: url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect to weather API !', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. There is a ${response.body.current.precip * 100}% chance of rain.`);
        }
    })
};

module.exports = forecast;


// const url = 'http://api.weatherstack.com/current?access_key=120fab5529364005f803a0276f72fd79&query=37.8267,-122.4233&units=f';

// request({ url: url, json: true }, (error, response) => {

//     if(error) {
//         console.log('Unable to connect to weather service')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. There is a ${response.body.current.precip * 100}% chance of rain.`);
//     }  
// });