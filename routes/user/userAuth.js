const {
    login,
    signUp,
    updateProfile,
    removeWallet,
    addWallet,
    getTrends,
    updateImage,
    getuser,
    resetPassword,
    verify,
    verifyEmail
  } = require("../../controllers/user/userController")
  const {calculateReward} = require("../../controllers/rewardSystem")
  const { authJwt} = require("../../middlewares/authJwt")
  module.exports = (router) => {
    router.route("/user/login").post(login)
    router.route("/user/signUp").post(signUp)
    router.route("/user/updateProfile").post(authJwt,updateProfile)
    router.route("/user/removeWallet").post(authJwt,removeWallet)
    router.route("/user/updateImage").post(authJwt,updateImage)
    router.route("/user/addWallet").post(authJwt,addWallet),
    router.route("/user/getTrends").get(getTrends)
    router.route("/user/calculateReward").get(calculateReward)
    router.route("/user/getuser").get(getuser)
    router.route("/user/resetPassword").post(resetPassword)
    router.route("/user/resetPassword").put(authJwt,verify)
    router.route("/user/verifyEmail").put(authJwt,verifyEmail)
    
  }
  