const passport = require("passport");
const APIError = require("../utils/APIError");
const { MESSAGES, ENUMS } = require("../utils/constants");
const status = require("http-status");

exports.authJwt = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (info)
      return next(new APIError(MESSAGES.TOKEN_NOT_VALID, status.UNAUTHORIZED));
    req.user = user;
    next();
  })(req, res, next);
};

exports.verifyAdmin = (req, res, next) => {
  if (req.user.role !== ENUMS.ADMIN) {
    return next(new APIError(MESSAGES.NOT_ALLOWED, status.UNAUTHORIZED));
  }
  next();
};
exports.verifyAuthor = (req, res, next) => {
  if (req.user.role !== ENUMS.ISAUTHOR) {
    return next(new APIError(MESSAGES.NOT_ALLOWED, status.UNAUTHORIZED));
  }
  next();
};
