const express = require("express");
const router = express.Router();
const axios = require("axios");
const consts = require("./consts");

const Weather = require("../models/weather");
// router.get("/cityWeather", function (req, res) {
//   axios
//     .get(
//       "https://api.openweathermap.org/data/2.5/weather?q=ilut,ils&APPID=9df1f2b6c11e188d4e33502f53a60686"
//     )
//     .then((result) => {
//       //   console.log(result);
//       res.send(result.data);
//     });
// });
const getCityByName = function (cityName, apiKey) {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName},ils&APPID=${apiKey}&units=metric`
    )
    .then((result) => {
      let data = result.data;
      let newCity = new Weather({
        name: data.name,
        condition: data.weather[0].main,
        conditionPic: data.weather[0].icon,
        temperature: data.main.temp,
      });
      //   res.send(newCity);
      return newCity;
    });
};
router.get("/weather/:cityName", function (req, res) {
  const cityName = req.params.cityName;
  getCityByName(cityName, consts.API_KEY).then((city) => {
    res.send(city);
  });
  //   axios
  //     .get(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${cityName},ils&APPID=${consts.API_KEY}&units=metric`
  //     )
  //     .then((result) => {
  //       let data = result.data;
  //       let newCity = new Weather({
  //         name: data.name,
  //         condition: data.weather[0].main,
  //         conditionPic: data.weather[0].icon,
  //         temperature: data.main.temp,
  //       });
  //       res.send(newCity);
  //     });
});
{
  /* <img
            src="https://openweathermap.org/img/wn/{{conditionPic}}@2x.png"
          /> */
}
router.get("/cities", function (req, res) {
  Weather.find({})
    .then((citiesData) => {
      res.send(citiesData);
    })
    .catch((err) => {
      console.log(err);
    });
});
const checkIfCityExists = async function (cityName) {
  return Weather.findOne({ name: cityName }).then((data) => {
    return data != undefined;
  });
};
// router.get("/test", function (req, res) {
//   Weather.findOne({ name: "nazareth" }).then((data) => {
//     res.send(data != undefined);
//   });
// });
router.post("/city", function (req, res) {
  let cityName = req.body?.name;
  if (cityName === undefined) {
    res.status(400).send({ error: "wrong query paramater" });
    return;
  }
  checkIfCityExists(cityName).then((isExist) => {
    if (!isExist) {
      getCityByName(cityName, consts.API_KEY)
        .then((city) => {
          city.save();
          res.send(city);
        })
        .catch((err) => res.status(409).send({ error: "city doesn't exist" }));
      return;
    }
    res.status(409).send({ error: "city already exists" });
    return;
  });
});
router.delete("/city/:cityName", function (req, res) {
  Weather.findOneAndDelete({ name: req.params.cityName }).then(
    (deletedCity) => {
      res.send(deletedCity);
    }
  );
});
module.exports = router;
// {
//     "coord": {
//         "lon": 35.2956,
//         "lat": 32.7036
//     },
//     "weather": [
//         {
//             "id": 803,
//             "main": "Clouds",
//             "description": "broken clouds",
//             "icon": "04d"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 12.93,
//         "feels_like": 12.11,
//         "temp_min": 12.53,
//         "temp_max": 15.22,
//         "pressure": 1011,
//         "humidity": 70,
//         "sea_level": 1011,
//         "grnd_level": 966
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 8.37,
//         "deg": 266,
//         "gust": 9.65
//     },
//     "clouds": {
//         "all": 56
//     },
//     "dt": 1678879852,
//     "sys": {
//         "type": 2,
//         "id": 2046556,
//         "country": "IL",
//         "sunrise": 1678852194,
//         "sunset": 1678895160
//     },
//     "timezone": 7200,
//     "id": 294098,
//     "name": "Nazareth",
//     "cod": 200
// }
