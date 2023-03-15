class ApiManager {
  constructor() {
    this.cities = [];
  }
  async getCityByName(cityName) {
    return $.get(`/weather/${cityName}`).then((city) => {
      city["exist"] = false;
      this.cities.push(city);
      //   this.checkIfCityExistInList(city);
    });
  }

  async getAllCities() {
    return $.get("/cities").then((cities) => {
      this.cities = [];
      this.cities.push(...cities);
      this.cities.forEach((city) => {
        city["exist"] = true;
      });
    });
  }
  saveCity(cityName) {
    return $.post("/city", { name: cityName });
  }
  deleteCity(cityName) {
    return $.ajax({
      url: `/city/${cityName}`,
      type: "DELETE",
      success: function () {},
    });
  }
  checkIfCityExistInList(city) {
    let isExist = false;
    // console.log(city);
    this.cities.forEach((c) => {
      if (c.name.toLowerCase() === city.name.toLowerCase()) {
        isExist = true;
      }
    });
    if (!isExist) {
      city["exist"] = false;
      this.cities.push(city);
    }
  }
  getCitiesData() {
    return this.cities;
  }
}
