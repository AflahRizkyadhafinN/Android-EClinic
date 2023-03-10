const express = require("express");
const sequelize = require('./models/connection')
const app = express();
const data = require('./controller/controller.js');
const bodyParser = require("body-parser");
const datas = require('./models/datas');

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
app.post("/login", data.login)
app.post("/update", data.update)
app.get("/auth", data.auth)
app.get("/rememberauth", data.rememberauth)
app.get("/updatetoken", data.updatetoken)
app.post("/profilerefresh", data.profilerefresh)
app.post("/logout", data.logout)

sequelize.sync(); 

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});