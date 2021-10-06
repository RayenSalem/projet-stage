const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')
const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')

const sendMail = (title, email, text) => {
  const mailgunAuth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_SANDBOX
    }
  }

  const mailer = nodemailer.createTransport(mg(mailgunAuth))

  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname, '../templates/template.hbs'),
    'utf8'
  )
  const template = handlebars.compile(emailTemplateSource)

  const htmlToSend = template({ message: text })

  const mailOptions = {
    from: 'Rayensalemj1@gmail.com',
    to: email,
    subject: title,
    html: htmlToSend
  }

  mailer.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error)
    } else {
      console.log('Successfully sent email.')
    }
  })
}

module.exports = sendMail
