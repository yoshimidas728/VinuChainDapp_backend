const MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  NOT_ALLOWED: "Route Not Allowed",
  NOT_SUCCESSFUL: "Not Successful",
  TOKEN_NOT_VALID: "Token Not Valid",
  TOKEN_NOT_FOUND: "Token Not Found",
  EMAIL_ALREADY_EXISTS: "Email Already Exists",
  SALT_BCRYPT: 10,
  NO_USER_FOUND: "No User Found",
  CREDENTIALS_DONT_MATCH: "Credentials Don`t Match",
  SUCCESSFUL: "Successful",
  CHECKBOX: "All Check Boxes are Required",
  I_AGREE: "type Error I Agree",
  IS_ALREADY_AUTHOR: "Is Already Author",
  POST_DOES_NOT_EXIST: "Post does not exist",
  POST_ALREADY_APPROVED: "Post Already Approved",
  SUCCESSFULY_BLOCKED: "User Blocked",
  UNBLOCKED: "User Unblocked",
  COMMENT_DOEST_EXIST: "Comment Doesn`t exist",
  ID_IS_REQUIRED: "ID is a required Field",
  ADD_MINUTES: function (date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  },
  EMAIL_FOR_FORGET_PASSWORD_RESET:
    "Reset Your Inkspire Password - Password Recovery Request",
  EMAIL_FOR_VERIFICATION: "Verify Your Email Address for Inkspire Registration",
  VERIFICATION_PENDING : "Email Verification Pending"
};
const MODELS = {
  USER: "User",
  COMMENT: "Comment",
  POST: "Post",
  LIKE: "Like",
  AUTHOR: "Author",
  IMPRESSION: "Impression",
  BALANCE: "Balance",
};
const TABELS = {
  USERS: "Users",
  COMMENTS: "Comments",
  POSTS: "Posts",
  LIKES: "Likes",
  AUTHORS: "Authors",
  IMPRESSIONS: "Impressions",
  BALANCES: "Balances",
};
const ENUMS = {
  ADMIN: "admin",
  USER: "user",
  VERIFICATION_PENDING : "Verification_Pending",
  PENDING: "AuthorShipPending",
  ISAUTHOR: "Author",
  APPROVED: "Approved",
  BLOCKED: "User Blocked",
  APPROVEL_PENDING: "approvel pending",
};
module.exports = {
  MESSAGES,
  MODELS,
  TABELS,
  ENUMS,
};
