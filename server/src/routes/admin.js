const express = require('express')

const router = express.Router()

const {
  findAllAdmins,
  deleteAdmin,
  createAdmin,
  createEmployee,
  findAllEmployees,
  deleteEmployee
} = require('../controllers/admin')

router.get('/findAll/:id', findAllAdmins)
router.delete('/admin/:id', deleteAdmin)
router.delete('/employee/:id', deleteEmployee)
router.post('/:id', createAdmin)
router.post('/employees/:id', createEmployee)
router.get('/findAllEmployees/:id', findAllEmployees)

module.exports = router
