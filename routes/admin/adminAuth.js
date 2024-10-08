const {
    login,
  } = require("../../controllers/admin/auth")
  module.exports = (router) => {
    router.route("/admin/Login").post(login)

  }
  