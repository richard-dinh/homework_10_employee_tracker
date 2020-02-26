const router = require('express').Router()
const db = require('../config/db.js')

//GET ROUTES

//Employee Get Routes
//Get all employees
router.get('/employees', (request, response)=>{
  db.query('SELECT * FROM employees', (error, employees)=>{
    if(error){console.error(error)}
    response.json(employees)
  })
})


//Roles Get Routes
//Get all roles
router.get('/roles', (request, response)=>{
  db.query('SELECT * FROM roles', (error, roles)=>{
    if(error){console.error(error)}
    response.json(roles)
  })
})

//Department Get Routes
//Get all departments
router.get('/departments', (request, response)=>{
  db.query('SELECT * FROM departments', (error, departments)=>{
    if(error){console.error(error)}
    response.json(departments)
  })
})

//POST ROUTES
//Employee Post Routes
//Create a new Employee
router.post('/employees', (request, response)=>{
  // request.body must come in Object format:
  /*{
    id,
    first_name,
    last_name,
    role_id,
    manager_id (optional)
  }*/
  db.query('INSERT INTO employees SET ?', request.body, error=>{
    if(error){console.error(error)}
    response.sendStatus(200)
  })
})

//Roles Post Routes
router.post('/roles', (request, response)=>{
  db.query('INSERT INTO roles SET ?', request.body, error=>{
    if(error){console.error(error)}
    response.sendStatus(200)
  })
})

//Department Post Routes
router.post('/departments', (request, response)=>{
  db.query('INSERT INTO departments SET ?', request.body, error=>{
    if(error){console.error(error)}
    response.sendStatus(200)
  })
})
module.exports = router