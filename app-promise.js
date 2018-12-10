const yargs = require("yargs");
const axios = require("axios");

// yargs configuration

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAr6c7MuQGdvi1dFPLPnjdNRmCE1d741io`;

// Axios.get() returns a promise, so we have to implement its .then() method also

axios
  .get(geocodeURL)
  .then(response => {
    if (response.data.status === "ZERO_RESULTS") {
      throw new Error("Unable to find that address");
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/cd987ac53e4543203ff62d250a1d93f8/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);

    // Now we return another promise and chain this at the end of this one
    return axios.get(weatherURL);
  })
  .then(response => {
    var temp = response.data.currently.temperature;
    var app_temp = response.data.currently.apparentTemperature;
    console.log(`Its currently ${temp}, but it feels like ${app_temp}`);
  })
  .catch(errorMessage => {
    if (errorMessage.code === "ENOTFOUND") {
      console.log("Unable to connect to API servers");
    } else {
      console.log(errorMessage.message);
    }
  });
