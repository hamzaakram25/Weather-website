const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaGFsb3ZlMjUiLCJhIjoiY2p6b2MzZnpuMDBvYjNja28yN3R3dHZ4ZyJ9.eJoz_ffl_nk263zY7qiyIg&units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search!", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[1],
        latitude: body.features[0].center[0],
        place: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
