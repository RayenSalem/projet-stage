const mongoose = require('mongoose')

const { Schema } = mongoose

const Entreprise = new Schema({
  matriculeFiscale: {
    type: String,
    minlength: 6,
    required: false
  },
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],

  typeEntreprise: {
    type: String,
    required: true
  },
  raisonSociale: {
    type: Number,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  nomEntreprise: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  addresse: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Entreprise', Entreprise)
