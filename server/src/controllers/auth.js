const express = require('express')
const User = require('../models/user')
const Entreprise = require('../models/entreprise')
const argon = require('argon2')
const sendMail = require('../config/config')
const createToken = require('../utils/createToken')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const loginAdmin = async (req, res) => {
  console.log(req)
  const { email, password } = req.body
  console.log(req.body)
  try {
    const user = await User.findOne({ email: email })
    console.log(user)
    if (!user) {
      res.status(401).json({ message: 'Wrong password/email' })
    }
    const valid = argon.verify(user.password, password)

    if (!valid) {
      res.status(401).json({ message: 'Wrong password/email' })
    }
    console.log(user)
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 365 })
    res.status(200).json({ message: { token, user } })
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: 'Wrong password/email' })
  }
}

const me = async (req, res) => {
  const token = req.headers['token']
  const payload = jwt.decode(token)
  console.log(payload)
  const id = payload.id
  const user = await User.findById(id)

  res.status(201).send({ user: user })
}

const signupAdmin = async (req, res) => {
  console.log(req.body)
  const { email, password, nom, prenom } = req.body

  const hashedPassword = await argon.hash(password)

  const createdUser = new User({
    email: email,
    password: hashedPassword,
    nom,
    prenom,
    isAdmin: true
  })

  await createdUser.save()
  sendMail(
    'Your Admin Account',
    email,
    `Your account is \n \n Email:${email} \n \n Password:${password}`
  )

  return res.status(200).send({ message: 'Successfully created the account!' })
}

const signupSuperAdmin = async (req, res) => {
  console.log(req.body)
  const { one, two, option } = req.body
  const {
    nom,
    prenom,
    password,
    email,
    matriculeFiscale,
    address,
    desc,
    nomEntrperise
  } = one
  const hashedPassword = await argon.hash(password)
  const createdUser = new User({
    email: email,
    password: hashedPassword,
    nom,
    prenom,
    isAdmin: true,
    isSuperAdmin: true
  })

  await createdUser.save()
  const user = await User.findOne({ email: email })
  let createdEntreprise
  if (option == 'Physique') {
    createdEntreprise = new Entreprise.create({
      matriculeFiscale: matriculeFiscale,
      typeEntreprise: option,
      admins: [],
      nom,
      prenom,
      description: desc,
      addresse: address
    })
    createdEntreprise.admins.push({ _id: user._id })
    const entreprise = await Entreprise.findOne({
      matriculeFiscale: matriculeFiscale
    })
    user.belongsTo = { _id: entreprise._id }
    user.save()
    createdEntreprise.save()
  } else {
    const { raisonSociale } = two
    createdEntreprise = new Entreprise({
      matriculeFiscale: matriculeFiscale,
      typeEntreprise: option,
      nomEntrperise,
      nom,
      prenom,
      admins: [],
      description: desc,
      addresse: address,
      raisonSociale
    })

    createdEntreprise.admins.push({ _id: user._id })

    console.log(createdEntreprise)
    user.belongsTo = { _id: createdEntreprise._id }
    user.save()
    createdEntreprise.save()
  }
  const token = createToken(user._id)
  res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 365 })
  return res.status(200).send({ message: { user, token } })
}

module.exports = { loginAdmin, signupAdmin, signupSuperAdmin, me }
