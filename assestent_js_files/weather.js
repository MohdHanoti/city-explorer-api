
const axios = require("axios");






async function getWetherHandler(req, res) {
    console.log('Weather data are in');
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

class Weather {
    constructor(item) {
      this.date = item.valid_date;
      this.minTemp = item.min_temp;
      this.maxTemp = item.max_temp;
      this.description = item.weather.description;
    }
  }
module.exports=getWetherHandler;

