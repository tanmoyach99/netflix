const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../modals/User");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

//create user or register route
authRouter.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  // console.log(newUser.password);

  try {
    const user = await newUser.save();
    console.log(user, "user");
    res.status(200).json(user);
  } catch (err) {
    res.status(404).send({ message: "auth failed" });
  }
});

//login route
authRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (user) {
      if (bcrypt.hashSync(req.body.password, user.password)) {
        const accessToken = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.SECRET_KEY,
          { expiresIn: "5d" }
        );
        // console.log(accessToken);
        // console.log(user);
        const { password, ...info } = user._doc;
        res.send({ info, accessToken });
        return;
      }
    }
  } catch (error) {
    res.status(401).send({ message: "wrong email or password" });
  }
});

module.exports = authRouter;
