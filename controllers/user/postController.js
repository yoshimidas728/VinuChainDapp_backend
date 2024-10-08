const catchAsync = require("../../utils/catchasync");
const { MODELS, MESSAGES, ENUMS } = require("../../utils/constants");
const APIError = require("../../utils/APIError");
const { APIresponse } = require("../../utils/APIresponse");
const status = require("http-status");
const db = require("../../models/index");
const { Op } = require("sequelize");
const { getTime } = require("../../utils/function");
const { pagination } = require("../../utils/function");

const createPost = catchAsync(async (req, res, next) => {
  console.log("-------------", req.body);
  req.body.desc ? req.body.desc : null;
  req.body.tags ? req.body.tags : null;
  req.body.title ? req.body.title : null;

  const gettime = await getTime(req.body.words);

  const create = await db[MODELS.POST].create({
    description: req.body.desc,
    status: ENUMS.APPROVED,
    title: req.body.title,
    tags: req.body.tags,
    time: gettime,
    UserId: req.user.id,
  });
  APIresponse(res, MESSAGES.SUCCESSFUL, { create });
});
const editPost = catchAsync(async (req, res, next) => {
  req.body.postId;
  req.body.desc ? req.body.desc : null;
  req.body.tags ? req.body.tags : null;
  req.body.title ? req.body.title : null;
  const gettime = await getTime(req.body.words);

  await db[MODELS.POST].update(
    {
      title: req.body.title,
      tags: req.body.tags,
      description: req.body.desc,
      time: gettime,
    },
    {
      where: {
        id: req.body.postId,
      },
    }
  );
  const update = await db[MODELS.POST].findByPk(req.body.postId);
  APIresponse(res, MESSAGES.SUCCESSFUL, update);
});
const deletePost = catchAsync(async (req, res, next) => {
  const { postId } = req.query;
  const check = await db[MODELS.POST].findOne({
    where: {
      id: postId,
      UserId: req.user.id,
    },
  });
  if (!check) {
    return next(new APIError("No Post Found", status.BAD_REQUEST));
  }
  await db[MODELS.POST].destroy({ where: { id: postId, UserId: req.user.id } });
  APIresponse(res, MESSAGES.SUCCESSFUL);
});
const likePost = catchAsync(async (req, res, next) => {
  const { postid } = req.body;
  const find = await db[MODELS.POST].findOne({
    where: {
      id: postid,
    },
  });
  if (!find) {
    return next(new APIError(MESSAGES.NOT_SUCCESSFUL, status.BAD_REQUEST));
  }
  const findLike = await db[MODELS.LIKE].findAll({
    where: {
      PostId: postid,
      UserId: req.user.id,
    },
  });
  if (findLike.length != 0) {
    const remvLike = await db[MODELS.LIKE].destroy({
      where: {
        PostId: postid,
        UserId: req.user.id,
      },
    });
    return APIresponse(res, MESSAGES.SUCCESSFUL, { remvLike });
  }
  const createLike = await db[MODELS.LIKE].create({
    PostId: postid,
    UserId: req.user.id,
  });
  APIresponse(res, MESSAGES.SUCCESSFUL, {
    createLike,
  });
});
const createComment = catchAsync(async (req, res, next) => {
  const { description, postid } = req.body;
  const postCheck = await db[MODELS.POST].findOne({
    where: {
      id: postid,
    },
  });
  if (!postCheck) {
    return next(new APIError(MESSAGES.POST_DOES_NOT_EXIST, status.BAD_REQUEST));
  }
  const createComment = await db[MODELS.COMMENT].create({
    UserId: req.user.id,
    PostId: postid,
    description: description,
  });
  APIresponse(res, MESSAGES.SUCCESSFUL, { createComment });
});
const editComment = catchAsync(async (req, res, next) => {
  const { description, id } = req.body;

  let UserId = req.user.id;
  const checkComment = await db[MODELS.COMMENT].findOne({
    where: {
      id: id,
      UserId: UserId,
    },
  });
  if (!checkComment) {
    return next(new APIError(MESSAGES.COMMENT_DOEST_EXIST, status.BAD_REQUEST));
  }
  await db[MODELS.COMMENT].update(
    {
      description: description,
    },
    {
      where: {
        UserId: UserId,
        id: id,
      },
    }
  );
  const updateComment = await db[MODELS.COMMENT].findByPk(id);
  APIresponse(res, MESSAGES.SUCCESSFUL, updateComment);
});
const deleteComment = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    return next(new APIError("id is required", status.BAD_REQUEST));
  }
  let check = await db[MODELS.COMMENT].findByPk(id);
  if (!check) {
    return next(new APIError("No Comment Found", status.BAD_REQUEST));
  }
  await db[MODELS.COMMENT].destroy({
    where: {
      id: id,
      UserId: req.user.id,
    },
  });
  APIresponse(res, MESSAGES.SUCCESSFUL);
});
const getAllPosts = catchAsync(async (req, res, next) => {
  let { query } = req.query;
  query = query ? query : undefined;
  if (query === undefined) {
    const post = await db[MODELS.POST].findAll({
      where: {
        status: ENUMS.APPROVED,
      },
      include: [
        {
          model: db[MODELS.USER],
          attributes: ["firstName", "lastName", "displayName", "avatar"],
        },
      ],
    });
    return APIresponse(res, MESSAGES.SUCCESSFUL, { post });
  }
  const post = await db[MODELS.POST].findOne({
    where: {
      id: query,
    },
    include: [
      {
        model: db[MODELS.USER],
        attributes: ["firstName", "lastName", "displayName", "avatar"],
      },
    ],
  });
  console.log("--------post tags", post.tags);
  // return
  const getAll = await db[MODELS.POST].findAll({
    limit: 4,
    where: {
      [Op.and]: [
        {
          id: {
            [Op.not]: query,
          },
        },
        { tags: { [Op.overlap]: post.tags } },
        {
          status: ENUMS.APPROVED,
        },
      ],
    },
    include: [
      {
        model: db[MODELS.USER],
        attributes: ["firstName", "lastName", "displayName", "avatar"],
      },
    ],
  });
  APIresponse(res, MESSAGES.SUCCESSFUL, { post: post, relatedPosts: getAll });
});
const getComments = catchAsync(async (req, res, next) => {
  let { query } = req.query;
  const comment = await db[MODELS.COMMENT].findAll({
    where: {
      PostId: query,
    },
    include: "User",
  });

  APIresponse(res, MESSAGES.SUCCESSFUL, { comment });
});
const getAllPostLikes = catchAsync(async (req, res, next) => {
  let { query } = req.query;
  const like = await db[MODELS.LIKE].findAll({
    where: {
      PostId: query,
    },
  });

  APIresponse(res, MESSAGES.SUCCESSFUL, { like });
});
const getAllUserPosts = catchAsync(async (req, res, next) => {
  console.log(req.user.id);
  const getAllBlogs = await db[MODELS.POST].findAll({
    where: {
      UserId: req.user.id,
    },
  });
  APIresponse(res, MESSAGES.SUCCESSFUL, getAllBlogs);
});
const filterBlogs = catchAsync(async (req, res, next) => {
  let { filter, page, size } = req.query;
  filter = filter ? filter : undefined;
  if (filter == undefined) {
    const getAll = await db[MODELS.POST].findAndCountAll({
      where: {
        status: ENUMS.APPROVED,
      },
      include: [
        {
          model: db[MODELS.USER],
          attributes: { exclude: ["password", "walletAddress"] },
        },
      ],
      order: [["createdAt", "DESC"]],
      ...pagination({ page, size }),
    });
    return APIresponse(res, MESSAGES.SUCCESSFUL, {
      count: getAll.count,
      data: getAll.rows,
      pages: Math.ceil(getAll.count / size),
    });
  }
  filter = JSON.parse(filter);
  const getAll = await db[MODELS.POST].findAndCountAll({
    where: {
      status: ENUMS.APPROVED,
      tags: { [Op.overlap]: filter },
    },
    include: [
      {
        model: db[MODELS.USER],
        attributes: { exclude: ["password", "walletAddress"] },
      },
    ],
    order: [["createdAt", "DESC"]],
    ...pagination({ page, size }),
  });
  return APIresponse(res, MESSAGES.SUCCESSFUL, {
    count: getAll.count,
    data: getAll.rows,
    pages: Math.ceil(getAll.count / size),
  });
});
module.exports = {
  createPost,
  likePost,
  createComment,
  getAllPosts,
  getComments,
  getAllPostLikes,
  editPost,
  editComment,
  deleteComment,
  deletePost,
  getAllUserPosts,
  filterBlogs,
};
