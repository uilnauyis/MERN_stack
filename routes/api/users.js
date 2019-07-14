const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post(
  '/',
  [
    check('name', 'Name cannot be left blank')
      .not()
      .isEmpty(),
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

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({
        email
      });
      if (user) {
        res
          .status(400)
          .json({ errors: [{ message: 'This user already exists' }] });
        return;
      }

      const avatar = gravatar.url(email, {
        s: 200,
        r: 'pg',
        d: 'mm'
      });

      const newUser = new User({ name, email, avatar, password });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();

      jwt.sign({ id: newUser.id }, process.env.SECRET, (err, token) => {
        if (err) throw err;
        res.send({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }

    console.log(req.body);
  }
);
module.exports = router;
