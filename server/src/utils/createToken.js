const jwt = require('jsonwebtoken')

const createToken = id => {
  return jwt.sign({ id }, 'qwquwbyqvwt1v2t1f2t12f12', { expiresIn: '7d' })
}

module.exports = createToken
