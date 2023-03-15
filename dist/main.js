const apiManager = new ApiManager();
const renderer = new Renderer();
const loadCities = async function () {
  return apiManager.getAllCities().then(() => {
    renderer.renderCities(apiManager.getCitiesData());
  });
};

$("#search").on("click", function () {
  let cityName = $("#cityName-input").val();
  apiManager.getCityByName(cityName).then(() => {
    renderer.renderCities(apiManager.getCitiesData());
  });
});
$(".cities-container").on("click", ".plusIcon", function () {
  let cityName = $(this).closest(".city").find(".name").data().name;
  apiManager.saveCity(cityName).then(() => {
    loadCities();
  });
});

$(".cities-container").on("click", ".minusIcon", function () {
  let cityName = $(this).closest(".city").find(".name").data().name;

  apiManager.deleteCity(cityName).then(() => {
    loadCities().then(() => {
      renderer.renderCities(apiManager.getCitiesData());
    });
  });
});

loadCities();
