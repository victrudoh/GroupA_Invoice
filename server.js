const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { sequelize } = require("./models");

const port = process.env.PORT || 3030;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


app.listen(port, () => {
    // sequelize.sync().then(() => {
      console.log(`Server running on ${port}`);
    // });
  });