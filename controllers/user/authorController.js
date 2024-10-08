const catchAsync = require("../../utils/catchasync");
const { MODELS, MESSAGES, ENUMS } = require("../../utils/constants");
const APIError = require("../../utils/APIError");
const { APIresponse } = require("../../utils/APIresponse");
const status = require("http-status");
const db = require("../../models/index");

const becomeAuthor = catchAsync(async(req,res,next)=>{
    const {a1,a2,a3,a4,a5,a6,a7,a8,a9} = req.body

    const check = await db[MODELS.USER].findOne({
        Where  : {
            id : req.user.id
        }
    })
    console.log("----checko",check)
    if(check.role == ENUMS.ISAUTHOR){
        return next(
            new APIError(MESSAGES.IS_ALREADY_AUTHOR,status.BAD_REQUEST)
        )
    }
    if(a4 && a5 && a6 && a7 && a8 !== true){
        return next(
            new APIError(MESSAGES.CHECKBOX,status.BAD_REQUEST)
        )
    }
    if(a9.toLowerCase() !== "i agree"){
        return next(
            new APIError(MESSAGES.I_AGREE,status.BAD_REQUEST)
        )
    }
    const save = await db[MODELS.AUTHOR].create({
        a1 : a1,
        a2 : a2,
        a3: a3,
        UserId : req.user.id,
        status : ENUMS.PENDING
    })
    await db[MODELS.USER].update(
        {
          role: ENUMS.PENDING,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
    APIresponse(res,MESSAGES.SUCCESSFUL,{save})
})

module.exports = {
    becomeAuthor
}