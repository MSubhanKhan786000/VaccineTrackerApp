const express = require('express');
const User = require('../models/user.model');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.json({ message: 'Email is not available' });
    }

    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    await newUser.save();
    console.log(newUser);
    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = router;
