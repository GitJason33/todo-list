const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');

const UserModel = require("../../models/user-model");
const { createJWToken } = require("../tools/functions.js");
const { UserValidator } = require("../tools/validators.js");

const router = express.Router();


/**
 * route:  GET /api/user/info
 * desc:   retrieve logged in user info
 * access: PRIVATE
 */
router.get("/info", isLoggedIn, (req, resp, next) => {
  try {
    const user = { ...req.user };
    
    delete user.password;
    resp.json(user);

  } catch (err) {
    next(err);
  }
});


/**
 * route:  POST /api/user/login
 * desc:   login a user
 * access: PUBLIC (with correct credentials)
 */
router.post("/login", async (req, resp, next) => {
  try {
    // body = { email, password }
    const { email, password } = req.body;
    UserValidator.loginData(req.body);


    const user = await UserModel.findByEmail(email);
    UserValidator.correctLoginCredentials({ user, givenPassword: password });


    const token = createJWToken(user._id);
    delete user.password;
    resp.status(200).json({ token, user });

  } catch (err) {
    next(err);
  }
});


/**
 * route:  POST /api/user/register
 * desc:   create new user
 * access: PUBLIC
 */
router.post("/register", async (req, resp, next) => {
  try {
    // body = { name, email, password }
    const { email } = req.body;
    UserValidator.registerData(req.body);

    const _user = await UserModel.findByEmail(email);
    UserValidator.alreadyExists(_user);


    const user = await UserModel.register(req.body);
    const token = createJWToken(user._id);

    delete user.password;
    resp.status(201).json({ token, user });

  } catch (err) {
    next(err);
  }
});


module.exports = router;