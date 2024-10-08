const jwt = require("jsonwebtoken");
const catchAsync = require("../../utils/catchasync");
const { MODELS, MESSAGES } = require("../../utils/constants");
const db = require("../../models/index");
const { loginValidation } = require("../../utils/JoiValidations/authValidations");
const APIError = require("../../utils/APIError");
const { APIresponse } = require("../../utils/APIresponse");
const status = require("http-status");
const bcrypt = require("bcrypt");


const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const schemaValidateion = loginValidation.validate(req.body);
  if (schemaValidateion.error) {
    return next(
      new APIError(
        schemaValidateion.error.details[0].message,
        status.BAD_REQUEST
      )
    );
  }
  const user = await db[MODELS.USER].findOne({
    where: {
      email: email.toLowerCase(),
    },
  });
  if (!user) {
    return next(
      new APIError(MESSAGES.CREDENTIALS_DONT_MATCH, status.BAD_REQUEST)
    );
  }
  const passwordValidate = await bcrypt.compare(password, user.password);
  if (!passwordValidate) {
    return next(
      new APIError(MESSAGES.CREDENTIALS_DONT_MATCH, status.BAD_REQUEST)
    );
  }
  const jwtToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role : user.role
    },
    process.env.JWT_SECRET_KEY
  );
  delete user.email
  delete user.password
  return APIresponse(res, MESSAGES.SUCCESSFUL, {
    user: user,
    token: jwtToken,
  });
});

module.exports = {
  login,
};
