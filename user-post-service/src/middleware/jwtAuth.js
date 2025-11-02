require("dotenv").config();
const JWT = require("jsonwebtoken");
const AppError = require("../utils/error.utils.js");
const axios = require("axios").default;

const jwtAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token || null;

    if (!token) {
      return next(new AppError("Not Authorized: No token provided", 401));
    }

    const response = await axios.post("http://localhost:3000/auth/verify-token", {
      token,
    });


    if(!(response.data.isValid))
    {
          return next(new AppError('Invalid Token', 400));
    }


    const payload = response.data.decoded
    
    req.user = { id: payload.id, email: payload.email , username:payload.username,role:payload.role };
    next();
  } catch (error) {
    console.error("JWT Auth Error:", error.message);
    return next(new AppError(`Not Authorized: ${error.message}`, 401));
  }
};

module.exports = jwtAuth;
