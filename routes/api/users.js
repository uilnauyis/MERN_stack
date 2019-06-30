const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

router.get(
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    res.send('User route');
  }
);
module.exports = router;
