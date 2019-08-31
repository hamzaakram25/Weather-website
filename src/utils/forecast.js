const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/f7c5e7a9b54b96636b7e6ec6d907aa2a/" +
    longitude +
    "," +
    latitude +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location! Try search again.", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary}. It is currently ${body.currently.temperature} degrees out. This high today ${body.daily.data[0].temperatureHigh} with low of ${body.daily.data[0].temperatureLow}. There is ${body.currently.precipProbability}% chances of rain. `
      );
    }
  });
};

module.exports = forecast;
