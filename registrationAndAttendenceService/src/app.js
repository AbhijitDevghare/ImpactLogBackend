const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require("path")

dotenv.config();

// Initialize express app
const app = express();

// Middlewares
app.use(express.json());  
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    callback(null, true); // allow all origins
  },
  credentials: true, // allow cookies
}));
// Logger
app.use(morgan('dev'));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
}));

app.set('trust proxy', 1);


const registrationsRoutes = require("./routes/v1/registrationRoutes");
app.use("/register",registrationsRoutes) 

const attendanceRoutes = require("./routes/v1/attendanceRoutes")
app.use("/attendence",attendanceRoutes) 

const errorMiddleware = require('./middleware/error.middleware');
app.use(errorMiddleware)

module.exports = app;
