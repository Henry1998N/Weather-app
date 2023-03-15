const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
  name: String,
  conditionPic: String,
  condition: String,
  temperature: String,
});

const Weather = mongoose.model("Weather", weatherSchema);
module.exports = Weather;
