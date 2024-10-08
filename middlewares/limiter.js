const rateLimit = require("express-rate-limit");

exports.limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1, // Maximum number of requests allowed within the window
  message: "Too many requests. Please try again later.",
});
