const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

/// Default path for Express config

const publicDirectoryPath = path.join(__dirname, "../public");
const viewDirectoryPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
/// Set up handelbars and views location

app.set("view engine", "hbs");
app.set("views", viewDirectoryPath);
hbs.registerPartials(partialPath);
/// Set up static directory to serve

app.use(express.static(publicDirectoryPath));

// app.get("/About", (req, res) => {
//   res.send("<h1>About page!</h1>");
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "HAmza Akram"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "HAmza Akram"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Information page!",
    name: "HAmza Akram"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    });
  }

  geocode(req.query.address, (error, { longitude, latitude, place } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(longitude, latitude, (error, forecast) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecast,
        location: place,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide an search item!"
    });
  }

  res.send({
    product: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help article not found!",
    name: "HAmza Akram"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page not found!",
    name: "HAmza Akram"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port!");
});
