const { body } = require('express-validator')
const User = require('../models/user')

exports.registerValidators = [
  body('email')
    .isEmail().withMessage('Enter valid email')
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value })
        if (user) {
          return Promise.reject('This email address has already been registered.')
        }
      } catch (e) {
        consolr.log(e)
      }
    })
    .normalizeEmail(),
  body('password', 'Password must be at least 6 symbols')
    .isLength({ min: 6, max: 56 }).isAlphanumeric().trim(),
  body('confirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords must match')
      }
      return true
    })
    .trim(),
  body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 symbols')
    .trim()
]

exports.courseValidators = [
  
]