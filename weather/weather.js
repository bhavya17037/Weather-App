const request = require("request");

var fetchWeather = (lat, lng, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/cd987ac53e4543203ff62d250a1d93f8/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        callback("Unable to fetch weather data from server.");
      }
    }
  );
};

module.exports = {
  fetchWeather: fetchWeather
};
