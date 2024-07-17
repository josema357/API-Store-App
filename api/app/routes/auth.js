const express = require('express');
const passport = require("passport");
const AuthService = require('../services/auth');
require('dotenv').config();

const router = express.Router();
const service = new AuthService();

router.post('/login', passport.authenticate('local', {session: false}), async (req, res, next) => {
  try {
    const user = req.user;
    const response = await service.signToken(user);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const response = await service.sendMailer(email);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;