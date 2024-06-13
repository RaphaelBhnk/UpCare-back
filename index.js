const express = require("express");
const bodyParser = require("body-parser");
const routeRoutes = require("./routes/route");
require("dotenv").config();

const app = express();
app.listen(process.env.PORT || 8000);
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("", routeRoutes);
