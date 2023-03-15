class Renderer {
  constructor() {}
  renderCities(citiesData) {
    const source = $("#cities-template").html();
    const template = Handlebars.compile(source);
    let newHTML = template({ cities: citiesData });
    $(".cities-container").empty().append(newHTML);
  }
}
