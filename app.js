const yargs = require("yargs");
const geocode = require("./geocode/geocode.js");
const weather = require("./weather/weather.js");

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

console.log(argv);

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  // Callback function which would execute after geocodeAddress is executed

  if (errorMessage) {
    console.log(errorMessage);
  } else {
    // chaining callbacks
    console.log(results.address);
    weather.fetchWeather(
      results.latitude,
      results.longitude,
      (errorMessage, weatherResults) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(JSON.stringify(weatherResults, undefined, 2));
        }
      }
    );
  }
});
