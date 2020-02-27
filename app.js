//Bring in routes
const { getEmployees, getEmployeesByDepartment, createEmployee, updateEmployee, deleteEmployee } = require('./controllers/employeeController.js')
const { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment } = require('./controllers/departmentController.js')
const { getRoles, getRole, createRole, updateRole, deleteRole } = require('./controllers/roleController.js')

// bring in console.table
const cTable = require('console.table')
//bring in inqurier
const prompt = require('inquirer').createPromptModule()

// const init = async () =>{
//   let {choice} = prompt([
//     {
//       type: 'rawlist',
//       name: 'choice',
//       message: 'What would you like to do?',
//       choices: ['View All Employees by Department', 'View all Employees by Manager, Add Employee, Remove Employee, Update Employee Role, Update Employee Manager, View All Roles']
//     }
//   ])
// }

// init()

