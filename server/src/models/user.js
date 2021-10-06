const mongoose = require('mongoose')

const { Schema } = mongoose

const User = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide email address'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6
  },
  resetToken: String,
  expireToken: Date,
  matriculeFiscale: {
    type: String,
    minlength: 6,
    required: false
  },
  typeEntreprise: {
    type: String,
    required: false
  },
  raisonSociale: {
    type: String,
    required: false
  },
  belongsTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entreprise'
  },
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },

  addresse: {
    type: String,
    required: false
  },
  isSuperAdmin: {
    type: Boolean,
    required: false
  },
  isAdmin: {
    type: Boolean,
    required: false
  },
  isEmployee: {
    type: Boolean,
    required: false
  }
})

module.exports = mongoose.model('User', User)
