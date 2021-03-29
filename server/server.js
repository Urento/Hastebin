var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  fs = require("fs"),
  path = require("path"),
  haste = require("./models/index.model"),
  chalk = require("chalk");
require("dotenv").config();

const port = process.env.PORT;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const rateLimit = require("express-rate-limit");

app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

var requestLogger = function (req, res, next) {
  console.log(req.method + " " + req.path + " " + res.statusCode);
  next();
};

app.use(cors());
app.use(requestLogger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var hasteRoutes = require("./routes/index.routes");
hasteRoutes(app);

app.use(function (req, res) {
  res.status(404).send({ error: "Not Authorized" });
});

app.listen(port, () => {
  console.log(chalk.green("API Server started on: " + port));
});
