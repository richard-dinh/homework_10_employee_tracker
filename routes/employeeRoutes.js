const router = require('express').Router()
const db = require('../config/db.js')

//GET ROUTES

//Get all employees
router.get('/employees', (request, response)=>{
  db.query('SELECT * FROM employees', (error, employees)=>{
    if(error){console.error(error)}
    response.json(employees)
  })
})
//Get all roles

//Get all departments


module.exports = router