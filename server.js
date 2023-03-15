const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const mongoose = require("mongoose");
const api = require("./server/routes/api");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

mongoose
  .connect("mongodb://127.0.0.1:27017/WeatherApp", {
    useNewUrlParser: true,
  })
  .catch((err) => console.log(err));
app.use("/", api);

app.listen(PORT, function () {
  console.log(`Running on port ${PORT}`);
});
