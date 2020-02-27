//Bring in routes
const { getEmployees, getEmployeesByDepartment, getEmployeesByManager, getEmployeesWithID, createEmployee, updateEmployee, deleteEmployee } = require('./controllers/employeeController.js')
const { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment } = require('./controllers/departmentController.js')
const { getRoles, getRole, createRole, updateRole, deleteRole } = require('./controllers/roleController.js')

// bring in console.table
const cTable = require('console.table')
//bring in inqurier
const prompt = require('inquirer').createPromptModule()

const init = async () => {
  let { choice } = await prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['View all Employees', 'View all Employees by Department', 'View all Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager']
    }
  ])
  switch (choice) {
    case 'View all Employees':
      let names = []
      getEmployeesWithID(data =>{
        data.forEach(person => {
          names.push({
            employee_id: person.employee_id,
            name: `${person.first_name} ${person.last_name}`
          }) 
        })
        // console.log(names)
        getEmployees(employees =>{
          for(let i = 0; i<employees.length; i++){
            for(let j = 0; j<names.length; j++){
              if(employees[i].manager_id===names[j].employee_id){
                employees[i].manager_name = names[j].name
              }else if (employees[i].manager_id ===null) {
                employees[i].manager_name = 'Null'
              }
            }
            delete employees[i].manager_id
          }
          console.table(employees)
          init()
        })

      })
      break
    case 'View all Employees by Department':
      console.log('dept')
      init()
      break
    case 'View all Employees by Manager':
      console.log('manager')
      init()
      break
    case 'Add Employee':
      console.log('Add')
      init()
      break
    case 'Remove Employee':
      console.log('remove')
      init()
      break
    case 'Update Employee Role':
      console.log('update role')
      init()
      break
    case 'Update Employee Manager':
      console.log('manager')
      init()
      break
  }
}

init()

