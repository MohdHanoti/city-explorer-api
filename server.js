"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
const axios = require("axios");

server.use(cors());

const PORT = process.env.PORT || 3001; // make the server opened for any request

// http://localhost:3001/
server.get("/", (req, res) => {
  res.send("Hi from the home roure");
});

//https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
// 2ac37284525fa00d719da04cdb70aaff
// http://localhost:3001/getWether?city=[cityname]
server.get("/getWether", getWetherHandler);
async function getWetherHandler(req, res) {
  let queryName = req.query.city;
  const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${queryName}&key=${process.env.key}`;

  axios
    .get(URL)
    .then((result) => {
      let weatherData = result.data.data.map((item) => {
        return new Weather(item);
      });

      let cityLat = result.data.lat;
      let cityLon = result.data.lon;
      let cityName = result.data.city_name;
      weatherData.push({
        cityLat: cityLat,
        cityLon: cityLon,
        cityName: cityName,
      });
      res.status(200).send(weatherData);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
}
// http://localhost:3001/getMovie?city=[cityname]

server.get("/getMovie", getMovieHandler);
async function getMovieHandler(req, res) {
  let queryName = req.query.city;
  const URL2 = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.key2}&query=${queryName}`;
  axios
    .get(URL2)
    .then((result) => {
      let moviesData = result.data.results.map((item) => {
        return new Movie(item);
      });

      res.status(200).send(moviesData);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
}

server.get("*", (req, res) => {
  // if the user put anything not exist

  res.send("page not found");
});

class Weather {
  constructor(item) {
    this.date = item.valid_date;
    this.minTemp = item.min_temp;
    this.maxTemp = item.max_temp;
    this.description = item.weather.description;
  }
}
class Movie {
  constructor(item) {
    this.Title = item.title;
    this.overview = item.overview;
    this.release_date = this.release_date;
    this.vote_average = this.vote_average;
    this.poster_path = this.poster_path;
  }
}

server.listen(PORT, () => {
  console.log(`Hello, I am listening on ${PORT}`);
});
