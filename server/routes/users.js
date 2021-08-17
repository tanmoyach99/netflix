const express = require("express");
const userRouter = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("../verifyToken.");
const User = require("../modals/User");

//update user

userRouter.put("/:id", verify, async (req, res) => {
  console.log(req.user);
  // console.log(verify);
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 8);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
      console.log(updatedUser);
    }
  } else {
    res.status(403).json("you can't update");
  }
});

//delete user

userRouter.delete("/:id", verify, async (req, res) => {
  // console.log(req.user);
  // // console.log(verify);
  if (req.user.id === req.params.id || req.user.isAdmin) {
    // if (req.body.password) {
    //   req.body.password = bcrypt.hashSync(req.body.password, 8);
    // }
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user has been deleted");
    } catch (err) {
      res.status(500).json(err);
      // console.log(updatedUser);
    }
  } else {
    res.status(403).json("you can't delete");
  }
});

//get user information
userRouter.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    // res.send({ info });
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

userRouter.get("/", verify, async (req, res) => {
  const query = req.query.new;

  if (req.user.isAdmin) {
    try {
      const users = query ? await User.find().limit(2) : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you are not allowed to see all users");
  }
});

userRouter.get("/stats", async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  const monthsArray = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: `$createdAt` },
          // year: { $year: `$createdAt` },
        },
      },
      {
        $group: {
          _id: "$month",
          // _id1: "$year",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = userRouter;
