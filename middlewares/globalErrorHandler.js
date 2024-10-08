const status = require("http-status")
const APIError = require("../utils/APIError")
const { MESSAGES } = require("../utils/constants")

module.exports = (err, req, res, next) => {
  let error
  console.log(err)
  if (err instanceof APIError) error = new APIError(err.message, err.statusCode)
  else
    error = new APIError(MESSAGES.INTERNAL_SERVER_ERROR, status.INTERNAL_SERVER_ERROR)
  res.status(error.statusCode).json({
    status: MESSAGES.NOT_SUCCESSFUL,
    error: true,
    data: {
      message: error.message
    }
  })
}
