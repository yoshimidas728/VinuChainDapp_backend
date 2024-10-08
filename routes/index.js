const userAuth = require('./user/userAuth')
const adminAuath = require("./admin/adminAuth")
const adminAuthorRoute = require("./admin/authorRoute")
const authorRoutes = require("./user/author")
const postAuth = require("./user/post")
const impression = require("./rewardSystem")

module.exports = (router) => {
  userAuth(router)
  adminAuath(router)
  postAuth(router)
  adminAuthorRoute(router)
  authorRoutes(router)
  impression(router)
  return router
}