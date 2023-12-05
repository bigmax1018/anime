const express = require("express");
const morgan = require("morgan");
const app = express();
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const AppError = require("./util/appError");
const v1_routes = require("./routes/v1/api_v1.routes");
const appGlobalErrorHandler = require("./util/appGlobalErrorHandler");
const bodyParser = require("body-parser");

const corsOptions = {
  optionsSuccessStatus: 200,
  origin: "*",
};

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
// app.use(limiter);
app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1", v1_routes);

app.all("*", (req, res, next) => {
  next(new AppError("API Route Not Found", 404));
});

app.use(appGlobalErrorHandler);

module.exports = app;
