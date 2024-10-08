const {
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
  filterBlogs
} = require("../../controllers/user/postController");
const { authJwt ,verifyAuthor} = require("../../middlewares/authJwt");
module.exports = (router) => {
  router.route("/user/createPost").post(authJwt,verifyAuthor, createPost);
  router.route("/user/likePost").post(authJwt, likePost);
  router.route("/user/createComment").post(authJwt, createComment);
  router.route("/user/getAllPosts").get(getAllPosts);
  router.route("/user/getComments").get(getComments);
  router.route("/user/getAllPostLikes").get(getAllPostLikes);
  router.route("/user/editPost").post(authJwt,verifyAuthor, editPost);
  router.route("/user/editComment").post(authJwt, editComment);
  router.route("/user/deleteComment").delete(authJwt, deleteComment);
  router.route("/user/deletePost").delete(authJwt, deletePost);
  router.route("/user/getBlogs").get(authJwt, getAllUserPosts);
  router.route("/user/filterBlogs").get(filterBlogs);

};
