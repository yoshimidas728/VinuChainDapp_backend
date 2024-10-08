const catchAsync = require("../../utils/catchasync");
const { MODELS, MESSAGES, ENUMS } = require("../../utils/constants");
const db = require("../../models/index");
const APIError = require("../../utils/APIError");
const { APIresponse } = require("../../utils/APIresponse");
const status = require("http-status");
const { Op } = require("sequelize");

const getAllAuthors = catchAsync(async (req, res, next) => {
  let { query } = req.query;
  query = query ? query : undefined;
  if (query === undefined) {
    const getAllauthors = await db[MODELS.USER].findAll({
      where: {
        [Op.or]: [{ role: ENUMS.PENDING }, { role: ENUMS.ISAUTHOR }],
      },
      include: MODELS.AUTHOR,
      include: "Posts",
    });
    return APIresponse(res, MESSAGES.SUCCESSFUL, {
      getAllauthors,
    });
  }
  const getAllauthors = await db[MODELS.USER].findAll({
    where: {
      role: query,
    },
    include: MODELS.AUTHOR,
    include: "Posts",
  });
  // const getAllauthors = await db[MODELS.AUTHOR].findAll({
  //   where: {
  //     status: query,
  //   },
  // });
  APIresponse(res, MESSAGES.SUCCESSFUL, {
    getAllauthors,
  });
});

const approveAuthor = catchAsync(async (req, res, next) => {
  const { authorId } = req.body;
  const check = await db[MODELS.AUTHOR].findOne({
    where: {
      UserId: authorId,
    },
  });
  if (check === null) {
    return next(new APIError(MESSAGES.NO_USER_FOUND, status.BAD_REQUEST));
  }
  if (check.status == ENUMS.ISAUTHOR) {
    return next(new APIError(MESSAGES.IS_ALREADY_AUTHOR, status.BAD_REQUEST));
  }
  await db[MODELS.AUTHOR].update(
    {
      status: ENUMS.ISAUTHOR,
    },
    {
      where: {
        UserId: authorId,
      },
    }
  );
  await db[MODELS.USER].update(
    {
      role: ENUMS.ISAUTHOR,
    },
    {
      where: {
        id: authorId,
      },
    }
  );
  APIresponse(res, MESSAGES.SUCCESSFUL);
});
const approvePost = catchAsync(async (req, res, next) => {
  const { postId } = req.body;
  const check = await db[MODELS.POST].findOne({
    where: {
      id: postId,
    },
  });
  if (check === null) {
    return next(new APIError(MESSAGES.POST_DOES_NOT_EXIST, status.BAD_REQUEST));
  }
  if (check.status == ENUMS.APPROVED) {
    return next(
      new APIError(MESSAGES.POST_ALREADY_APPROVED, status.BAD_REQUEST)
    );
  }
  await db[MODELS.POST].update(
    {
      status: ENUMS.APPROVED,
    },
    {
      where: {
        id: postId,
      },
    }
  );
  APIresponse(res, MESSAGES.SUCCESSFUL);
});
const blockUser = catchAsync(async (req, res, next) => {
  const { userId } = req.body;
  const find = await db[MODELS.USER].findOne({
    where: {
      id: userId,
    },
  });
  if (!find) {
    return next(new APIError(MESSAGES.NO_USER_FOUND, status.BAD_REQUEST));
  }
  console.log("----", find);
  if (find.role == ENUMS.BLOCKED) {
    await db[MODELS.USER].update(
      {
        role: ENUMS.USER,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    return APIresponse(res, MESSAGES.UNBLOCKED);
  }
  await db[MODELS.USER].update(
    {
      role: ENUMS.BLOCKED,
    },
    {
      where: {
        id: userId,
      },
    }
  );
  APIresponse(res, MESSAGES.SUCCESSFULY_BLOCKED);
});
const getAllPendingPosts = catchAsync(async (req, res, next) => {
    const getAll = await db[MODELS.POST].findAll({
      where: {
        status : ENUMS.APPROVEL_PENDING
      },
    });
    APIresponse(res,MESSAGES.SUCCESSFUL,getAll)
});
module.exports = {
  approveAuthor,
  getAllAuthors,
  approvePost,
  blockUser,
  getAllPendingPosts,
};
