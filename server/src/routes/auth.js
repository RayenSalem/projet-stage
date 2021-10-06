const express = require('express')

const crypto = require('crypto')
const router = express.Router()

const mongoose = require('mongoose')
const argon = require('argon2')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const sendMail = require('../config/config')
const {
  loginAdmin,
  signupAdmin,
  signupSuperAdmin,
  me
} = require('../controllers/auth')
const user = require('../models/user')
const createToken = require('../utils/createToken')
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.MAILGUN_API_KEY
    }
  })
)

router.post('/login', loginAdmin)

router.post('/signup', signupAdmin)
router.post('/superAdmin', signupSuperAdmin)
router.get('/me', me)
router.post('/reset-password', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(422).json({ error: 'User dont exists with that email' })
    }

    const token = createToken(user.email)
    user.resetToken = token
    console.log(token)
    user.save().then(result => {
      sendMail(
        'password reset',
        req.body.email,
        `
                     <p>You requested for password reset</p>
                     <h5>click in this <a href="${req.body.email}/reset/${token}">link</a> to reset password</h5>
                 `
      )

      res.json({ message: 'check your email' })
    })
  })
})

router.post('/reset', (req, res) => {
  const token = req.body.token
  const password = req.body.password
  const { id } = jwt.decode(token)
  console.log(id, token)
  User.findOne({ email: id }).then(user => {
    if (!user) {
      return res.status(422).json({ error: 'User dont exists with that email' })
    }
    console.log(user.resetToken)
    if (user.resetToken == token) {
      console.log('hello')
      user.password = argon.hash(password)
      user.resetToken = ''
      user.save().then(result => {
        sendMail(
          'password resetted',
          id,
          `
                     <p>Your password has been resetted</p>
                     <h5>new password ${password}</h5>
                 `
        )
        return res.json({ message: 'check your email' })
      })
    } else {
      return res.json({ message: 'Invalid token' })
    }
  })
})

module.exports = router
