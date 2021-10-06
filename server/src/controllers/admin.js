const express = require('express')
const User = require('../models/user')
const Entreprise = require('../models/entreprise')
const mongoose = require('mongoose')
const argon = require('argon2')
const sendMail = require('../config/config')
const findAllAdmins = async (req, res) => {
  try {
    const entreprise = await Entreprise.findOne({
      _id: mongoose.Types.ObjectId(req.params.id)
    })
      .populate('admins', ['email', 'prenom', 'nom', '_id'])
      .exec()
    const admins = entreprise.admins.map(i => {
      obj = {}
      obj.id = i._id
      obj.email = i.email
      obj.prenom = i.prenom
      obj.nom = i.nom

      return obj
    })
    res.status(201).send({ message: admins })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: 'Something happened' })
  }
  // res.send({ message: 'hello' })
}

const createAdmin = async (req, res) => {
  console.log(req.body)
  const id = req.params.id
  const { email, password, nom, prenom } = req.body

  const hashedPassword = await argon.hash(password)

  const createdUser = new User({
    email: email,
    password: hashedPassword,
    nom,
    prenom,
    isAdmin: true
  })
  const entreprise = await Entreprise.findById(id)
  entreprise.admins.push(createdUser)

  await entreprise.save()
  await createdUser.save()
  sendMail(
    'Your Admin Account',
    email,
    `Your account is \n \n Email:${email} \n \n Password:${password}`
  )

  return res.status(200).send({
    message: {
      id: createdUser._id,
      email: createdUser.email,
      nom: createdUser.nom,
      prenom: createdUser.prenom
    }
  })
}

const findAllEmployees = async (req, res) => {
  try {
    const entreprise = await Entreprise.findOne({
      _id: mongoose.Types.ObjectId(req.params.id)
    })
      .populate('employees', [
        'email',
        'prenom',
        'nom',
        '_id',
        'isAdmin',
        'isSuperAdmin',
        'isEmployee'
      ])
      .exec()
    console.log(entreprise.admins.length)
    let admins = entreprise.admins.map(i => {
      obj = {}
      obj.id = i._id
      obj.email = i.email
      obj.prenom = i.prenom
      obj.nom = i.nom
    })

    console.log(entreprise.employees)
    res.status(201).send({ message: entreprise.employees })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: 'Something happened' })
  }
  // res.send({ message: 'hello' })
}

const createEmployee = async (req, res) => {
  console.log(req.body)
  const id = req.params.id
  const { email, password, nom, prenom } = req.body

  const hashedPassword = await argon.hash(password)

  const createdUser = new User({
    email: email,
    password: hashedPassword,
    nom,
    prenom,
    isEmployee: true
  })
  const entreprise = await Entreprise.findById(id)
  entreprise.employees.push(createdUser)
  await entreprise.save()
  await createdUser.save()
  sendMail(
    'Your Admin Account',
    email,
    `Your account is \n \n Email:${email} \n \n Password:${password}`
  )

  return res.status(200).send({
    message: {
      id: createdUser._id,
      email: createdUser.email,
      nom: createdUser.nom,
      prenom: createdUser.prenom
    }
  })
}

const deleteEmployee = async (req, res) => {
  const id = req.params.id

  await User.findByIdAndDelete(id)
  // const entreprise
  return res.status(201).send({ message: 'Successfully deleted' })
}
const modifEmployee = async (req, res) => {
  const id = req.params.id
  const { email, password, nom, prenom } = user.body

  const user = await User.findByIdAndUpdate(id, {
    email: email,
    password: hashedPassword,
    nom,
    prenom,
    isEmployee: true
  })

  const hashedPassword = await argon.hash(password)

  // const entreprise
  return res.status(201).send({ message: 'Successfully  modified' })
}

const deleteAdmin = async (req, res) => {
  const id = req.params.id

  await User.findByIdAndDelete(id)
  // const entreprise
  return res.status(201).send({ message: 'Successfully deleted' })
}

module.exports = {
  findAllAdmins,
  deleteAdmin,
  createAdmin,
  createEmployee,
  findAllEmployees,
  deleteEmployee
}
