const jwt = require("jsonwebtoken");
const catchAsync = require("../../utils/catchasync");
const { MODELS, MESSAGES, ENUMS } = require("../../utils/constants");
const db = require("../../models/index");
const {
  signupSchema,
  loginValidation,
} = require("../../utils/JoiValidations/authValidations");
const APIError = require("../../utils/APIError");
const { APIresponse } = require("../../utils/APIresponse");
const status = require("http-status");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../utils/email");
const { otpTemplate } = require("../../templates/forgetPassword");
const { emailVerificationTemplate } = require("../../templates/verifyEmail");
const { pagination } = require("../../utils/function");
const { Sequelize } = require("sequelize");

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
  console.log({ user });
  if (!user) {
    return next(
      new APIError(MESSAGES.CREDENTIALS_DONT_MATCH, status.BAD_REQUEST)
    );
  }
  console.log({ password }, { hh: user.password });
  const passwordValidate = await bcrypt.compare(password, user?.password);
  if (!passwordValidate) {
    return next(
      new APIError(MESSAGES.CREDENTIALS_DONT_MATCH, status.BAD_REQUEST)
    );
  }
  if (user.role === ENUMS.VERIFICATION_PENDING) {
    return next(
      new APIError(MESSAGES.VERIFICATION_PENDING, status.BAD_REQUEST)
    );
  }
  const jwtToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY
  );
  const data = await db[MODELS.USER].findOne({
    attributes: { exclude: ["password"] },
    where: {
      email: email.toLowerCase(),
    },
  });
  return APIresponse(res, MESSAGES.SUCCESSFUL, {
    user: data,
    token: jwtToken,
  });
});
const signUp = catchAsync(async (req, res, next) => {
  const { email, password, walletAddress } = req.body;
  const schemaValidateion = signupSchema.validate(req.body);
  if (schemaValidateion.error) {
    return next(
      new APIError(
        schemaValidateion.error.details[0].message,
        status.BAD_REQUEST
      )
    );
  }
  const emailExists = await db[MODELS.USER].findOne({
    where: {
      email: email.toLowerCase(),
    },
  });
  const walletAddressExists = await db[MODELS.USER].findOne({
    where: {
      walletAddress: walletAddress,
    },
  });
  if (emailExists) {
    return next(
      new APIError(MESSAGES.EMAIL_ALREADY_EXISTS, status.BAD_REQUEST)
    );
  }
  if (walletAddressExists) {
    return next(
      new APIError("WalletAddess Already exists", status.BAD_REQUEST)
    );
  }
  const hash = await bcrypt.hash(password, MESSAGES.SALT_BCRYPT);
  const time = MESSAGES.ADD_MINUTES(new Date(), 60);
  const createUser = await db[MODELS.USER].create({
    email: email.toLowerCase(),
    password: hash,
    role: ENUMS.VERIFICATION_PENDING,
    walletAddress: walletAddress,
    expiresIn: time,
  });
  const token = jwt.sign(
    { id: createUser.id, email: email },
    process.env.JWT_SECRET_KEY
  );

  const link = `${process.env.FRONTENDURL}/email-verification/${token}`;
  const sendMail = await sendEmail(
    email,
    MESSAGES.EMAIL_FOR_VERIFICATION,
    emailVerificationTemplate(link)
  );
  if (sendMail instanceof APIError) {
    return next(sendMail);
  }
  delete createUser.password;
  return APIresponse(res, MESSAGES.SUCCESSFUL, {
    User: createUser,
  });
});
const updateProfile = catchAsync(async (req, res, next) => {
  let { firstName, lastName, displayName, about } = req.body;
  let Name = displayName ? displayName : undefined;
  firstName = firstName ? firstName : undefined;
  lastName = lastName ? lastName : undefined;
  let aboutt = about ? about : undefined;

  await db[MODELS.USER].update(
    {
      firstName: firstName,
      lastName: lastName,
      displayName: Name,
      about: aboutt,
    },
    {
      where: {
        id: req.user.id,
      },
    }
  );
  const updated = await db[MODELS.USER].findOne({
    where: {
      id: req.user.id,
    },
  });
  APIresponse(res, MESSAGES.SUCCESSFUL, updated);
});
const addWallet = catchAsync(async (req, res, next) => {
  const { walletAddress } = req.body;

  await db[MODELS.USER].update(
    {
      walletAddress: walletAddress,
    },
    {
      where: {
        id: req.user.id,
      },
    }
  );
  const get = await db[MODELS.USER].findByPk(req.user.id, {
    attributes: {
      exclude: ["password"],
    },
  });
  APIresponse(res, MESSAGES.SUCCESSFUL, get);
});
const removeWallet = catchAsync(async (req, res, next) => {
  await db[MODELS.USER].update(
    {
      walletAddress: "",
    },
    {
      where: {
        id: req.user.id,
      },
    }
  );
  APIresponse(res, MESSAGES.SUCCESSFUL);
});
const getTrends = catchAsync(async (req, res, next) => {
  let { page, size } = req.query;
  const get = await db[MODELS.POST].findAndCountAll({
    attributes: {
      include: [
        [Sequelize.literal('(SELECT COUNT(*) FROM "Impressions" WHERE "Impressions"."PostId" = "Post"."id")'), 'impressions'],
      ],
    },
    ...pagination({ page, size }),
    order:[['impressions','DESC']]
  });

  
  return APIresponse(res, MESSAGES.SUCCESSFUL, {
    count: get.count,
    data: get.rows,
    pages: Math.ceil(get.count / size),
  });
});
const updateImage = catchAsync(async (req, res, next) => {
  const { image } = req.body;
  if (!image) {
    return next(
      new APIError(MESSAGES.IMAGE_IS_REQUIRED_FIELD, status.BAD_REQUEST)
    );
  }
  await db[MODELS.USER].update(
    { avatar: image }, // New values to update
    { where: { id: req.user.id } } // Condition to find the record(s)
  );
  const getUser = await db[MODELS.USER].findOne({
    attributes: [
      "firstName",
      "lastName",
      "displayName",
      "avatar",
      "email",
      "about",
      "role",
    ],
    where: {
      id: req.user.id,
    },
  });
  APIresponse(res, MESSAGES.SUCCESSFUL, getUser);
});
const getuser = catchAsync(async (req, res, next) => {
  let { id } = req.query;
  id ? id : undefined;
  if (!id) {
    return next(new APIError(MESSAGES.ID_IS_REQUIRED, status.BAD_REQUEST));
  }
  const getUser = await db[MODELS.USER].findOne({
    attributes: { exclude: ["password", "walletAddress"] },
    where: { id: id },
  });
  if (!getUser) {
    return next(new APIError(MESSAGES.NO_USER_FOUND, status.BAD_REQUEST));
  }
  APIresponse(res, MESSAGES.SUCCESSFUL, getUser);
});
const resetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const find = await db[MODELS.USER].findOne({
    where: {
      email: email,
    },
  });
  if (!find) {
    return next(new APIError(MESSAGES.NO_USER_FOUND, status.BAD_REQUEST));
  }
  const time = MESSAGES.ADD_MINUTES(new Date(), 60);
  const token = jwt.sign(
    { id: find.id, email: email },
    process.env.JWT_SECRET_KEY
  );
  await db[MODELS.USER].update(
    {
      fToken: token,
      expiresIn: time,
    },
    {
      where: {
        email: email,
      },
    }
  );

  const link = `${process.env.FRONTENDURL}/reset-password/${token}`;
  const sendMail = await sendEmail(
    email,
    MESSAGES.EMAIL_FOR_FORGET_PASSWORD_RESET,
    otpTemplate(link)
  );
  if (sendMail instanceof APIError) {
    return next(sendMail);
  }
  console.log("token", token);
  APIresponse(res, MESSAGES.SUCCESS_MESSAGE);
});
const verify = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const find = await db[MODELS.USER].findOne({
    where: {
      email: req.user.email,
    },
  });
  if (!find) {
    return next(new APIError(MESSAGES.NO_USER_FOUND, status.UNAUTHORIZED));
  }
  if (find.expiresIn >= new Date()) {
    await db[MODELS.USER].update(
      {
        password: await bcrypt.hash(password, MESSAGES.SALT_BCRYPT),
        fToken: "",
        expiresIn: null,
      },
      {
        where: {
          email: req.user.email,
        },
      }
    );
    const user = await db[MODELS.USER].findOne({
      attributes: {
        exclude: ["password", "walletAddress", "fToken", "expiresIn"],
      },
      where: {
        email: req.user.email,
      },
    });
    return APIresponse(res, MESSAGES.SUCCESSFUL, user);
  }
  return next(new APIError(MESSAGES.TOKEN_NOT_VALID, status.UNAUTHORIZED));
});
const verifyEmail = catchAsync(async (req, res, next) => {
  const find = await db[MODELS.USER].findOne({
    where: {
      email: req.user.email,
    },
  });
  if (!find) {
    return next(new APIError(MESSAGES.NO_USER_FOUND, status.UNAUTHORIZED));
  }
  if (find.expiresIn >= new Date()) {
    await db[MODELS.USER].update(
      {
        role: ENUMS.USER,
        expiresIn: null,
      },
      {
        where: {
          email: req.user.email,
        },
      }
    );
    const user = await db[MODELS.USER].findOne({
      attributes: {
        exclude: ["password", "walletAddress", "fToken", "expiresIn"],
      },
      where: {
        email: req.user.email,
      },
    });
    return APIresponse(res, MESSAGES.SUCCESSFUL, user);
  }
  return next(new APIError(MESSAGES.TOKEN_NOT_VALID, status.UNAUTHORIZED));
});
module.exports = {
  login,
  signUp,
  resetPassword,
  updateProfile,
  removeWallet,
  addWallet,
  getTrends,
  updateImage,
  getuser,
  verify,
  verifyEmail,
};
