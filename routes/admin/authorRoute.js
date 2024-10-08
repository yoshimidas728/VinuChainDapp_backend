const {
  approveAuthor,
  getAllAuthors,
  approvePost,
  blockUser,
  getAllPendingPosts
  } = require("../../controllers/admin/author")
  const {authJwt,verifyAdmin} = require("../../middlewares/authJwt")
  module.exports = (router) => {
    router.route("/admin/author/getAll").get(authJwt,verifyAdmin,getAllAuthors)
    router.route("/admin/author/approve").post(authJwt,verifyAdmin,approveAuthor)
    router.route("/admin/author/approvePost").post(authJwt,verifyAdmin,approvePost)
    router.route("/admin/author/blockUser").post(authJwt,verifyAdmin,blockUser)
    router.route("/admin/author/getAllPendingPosts").get(authJwt,verifyAdmin,getAllPendingPosts)



  }
  