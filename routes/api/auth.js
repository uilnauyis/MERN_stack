const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post(
  '/',
  [
    check('email', 'Email cannot be left blank').isEmail(),
    check(
      'password',
      'Please set a password with minimum length of 8'
    ).isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({
        email
      });
      if (!user) {
        res.status(400).json({ errors: [{ message: 'Invalid credential' }] });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ errors: [{ message: 'Invalid credential' }] });
      }
      jwt.sign({ id: user.id }, process.env.SECRET, (err, token) => {
        if (err) throw err;
        res.send({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);
module.exports = router;
