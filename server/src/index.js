const express = require('express')
const app = express()
const cors = require('cors')
const auth = require('./routes/auth')
const admins = require('./routes/admin')
const mongoose = require('mongoose')

require('dotenv/config')

const connectToDb = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://Rayen:Rayenkirra@cluster0.e8788.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )

    console.log('Connected to MongoDB!')
  } catch (error) {
    console.error(`Error while connecting to MongoDB: `, error.message)
  }
}

connectToDb()
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['POST', 'GET', 'PUT', 'DELETE']
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/admins', admins)

app.use('/auth', auth)

app.listen(4000, () => console.log('Server is running on port 4000'))
