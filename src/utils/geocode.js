const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFoZWRkYXIiLCJhIjoiY2tza2cwaHg2MDhjbDJ2c28zM3F0ejYyaSJ9.Q0AIaJQA0mcH80XOmBKkmA`;
    request({ url: url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect to location services !', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            });
        }
    })
};

module.exports = geoCode;