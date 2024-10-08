const { becomeAuthor} = require("../../controllers/user/authorController");
const { authJwt } = require("../../middlewares/authJwt");
module.exports = (router) => {
  router.route("/user/becomeAuthor").post(authJwt,becomeAuthor);

};
