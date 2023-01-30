const express = require("express");
const sequelize = require('./models/connection')

const app = express();
const data = require('./controller/controller.js');
const bodyParser = require("body-parser");


app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ alert: "masuk" });
});
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.get("/users", data.findAll)
app.post("/signup", data.signup)

sequelize.sync(); 

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});