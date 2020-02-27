const router = require('express').Router()
const {getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee} = require('../controllers/employeeController.js')

//GET ROUTES

//Employee Get Routes
//Get all employees
router.get('/employees', (request, response)=>{
  getEmployees(employees =>{
    response.json(employees)
  })
})

//Get one employee
router.get('/employees/:id', (request, response) => {
  getEmployee(request.params.id, person=>{
    response.json(person)
  })
})

//create an employee
router.post('/employees', (request, response) => {
  createEmployee(request.body, ()=>{
    response.sendStatus(200)
  })
})

// update an employee
router.put('/employees/:id', (request, response) => {
  updateEmployee(request.params.id, request.body, ()=>{
    response.sendStatus(200)
  })
})

// delete an employee
router.delete('/employees/:id', (request, response) => {
  deleteEmployee(request.params.id, ()=>{
    response.sendStatus(200)
  })
})
module.exports = router