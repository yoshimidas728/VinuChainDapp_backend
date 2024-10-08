const {
    createImpression,
    calculateReward,
    
} = require("../controllers/rewardSystem")
const {limiter} = require("../middlewares/limiter")
const {authJwt} = require("../middlewares/authJwt")
module.exports = (router) => {
    router.route("/impression").post(authJwt,limiter,createImpression)
    router.route("/calculateReward").get(calculateReward)

  }