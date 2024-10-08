const catchAsync = require("../utils/catchasync");
const { MODELS, MESSAGES, ENUMS } = require("../utils/constants");
const APIError = require("../utils/APIError");
const { APIresponse } = require("../utils/APIresponse");
const status = require("http-status");
const db = require("../models/index");
const { Op } = require("sequelize");
const { getBalance, main } = require("../config/Contract");
const cron = require('node-cron');
const { ethers } = require("ethers");

const calculateReward = catchAsync(async (req, res, next) => {
  const number = await getBalance();


  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  console.log({ endOfToday });
  console.log({ startOfToday });

  const authorsPortion = number * 0.3;
  const viewersPortion = number * 0.1;
  const totalLikes = await db[MODELS.USER].count({
    include: [
      {
        model: db[MODELS.LIKE],
        where: {
          createdAt: {
            [Op.between]: [startOfToday, endOfToday],
          },
        },
      },
    ],
  });
  const totalImpressions = await db[MODELS.USER].count({
    include: [
      {
        model: db[MODELS.IMPRESSION],
        where: {
          createdAt: {
            [Op.between]: [startOfToday, endOfToday],
          },
        },
      },
    ],
  });
  const costPerImpression = (viewersPortion / totalImpressions) 
  const costPerLike = (authorsPortion / totalLikes) ;

console.log( {costPerImpression}, {costPerLike})

  const allUsersLikes = await db[MODELS.USER].findAll({
    include: [
      {
        model: db[MODELS.LIKE],
        where: {
          createdAt: {
            [Op.between]: [startOfToday, endOfToday],
          },
        },
      },
    ],
  });
  let walletArray = [];
  let amountArray = [];
  for (const element of allUsersLikes) {
    console.log(typeof element.Likes.length)
    let Amount = element.Likes.length * costPerLike;
    Amount = Amount.toString();
    Amount = ethers.parseEther(Amount)
    Amount = Amount.toString()

console.log("-----Amount---",Amount)
    const wallet1 = element.walletAddress;
    walletArray.push(wallet1.toString());
    amountArray.push(Amount);
  }
  const allUsersImpressions = await db[MODELS.USER].findAll({
    include: [
      {
        model: db[MODELS.IMPRESSION],
        where: {
          createdAt: {
            [Op.between]: [startOfToday, endOfToday],
          },
        },
      },
    ],
  });

  for (const element of allUsersImpressions) {
    let Amount = element.Impressions.length * costPerImpression;
    Amount = Amount.toString();
    Amount = ethers.parseEther(Amount)
    Amount = Amount.toString()

console.log("-----Amount---",Amount)

    const wallet1 = element.walletAddress;
    walletArray.push(wallet1.toString());
    amountArray.push(Amount);
  }
  await main(walletArray, amountArray);

  APIresponse(res, MESSAGES.SUCCESSFUL, {
    walletArray,
    amountArray,
  });
});
const createImpression = catchAsync(async (req, res, next) => {
  const { PostId, UserId } = req.body;
  const find = await db[MODELS.IMPRESSION].findOne({
    where: {
      UserId,
      PostId,
    },
  });
  if (find) {
    return next(new APIError("impression already created", status.BAD_REQUEST));
  }
  await db[MODELS.IMPRESSION].create({
    PostId,
    UserId,
  });
  APIresponse(res, MESSAGES.SUCCESSFUL);
});
cron.schedule('58 23 * * *', () => {
  // Code to execute at 11:58
  console.log('Cron job executed at 11:58');
  console.log('          *          ');
  console.log('*********************');
  console.log('*********************');
  console.log('*********************');
  console.log('*********************');
  console.log('*********************');
  console.log('*********************');
  console.log('*********************');

});


module.exports = {
  calculateReward,
  createImpression,
};
