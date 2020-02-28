//Bring in routes
const { getEmployees, getEmployeesByDepartment, getEmployeesByManager, getEmployeesWithID, createEmployee, updateEmployee, deleteEmployee } = require('./controllers/employeeController.js')
const { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment } = require('./controllers/departmentController.js')
const { getRoles, getRole, createRole, updateRole, deleteRole } = require('./controllers/roleController.js')

// bring in console.table
const cTable = require('console.table')
//bring in inqurier
const prompt = require('inquirer').createPromptModule()


//replaces the manager id with the employee's name
const replaceManagerID = (names, employees) => {
  for (let i = 0; i < employees.length; i++) {
    for (let j = 0; j < names.length; j++) {
      if (employees[i].manager_id === names[j].employee_id) {
        employees[i].manager_name = names[j].name
      } else if (employees[i].manager_id === null) {
        employees[i].manager_name = 'Null'
      }
    }
    //delete the manager_id at the end so it does not populate on console.table
    delete employees[i].manager_id
  }
  return employees
}

const init = async () => {
  //populating names array with employee id and combined first and last name
  let names = []
  getEmployeesWithID(data => {
    data.forEach(person => {
      names.push(
        {
          employee_id: person.employee_id,
          name: `${person.first_name} ${person.last_name}`
        }
      )
    })
  })
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
      getEmployees(employees => {
        employees = replaceManagerID(names, employees)
        console.table(employees)
        init()
      })
      break
    case 'View all Employees by Department':
      getDepartments(departments => {
        let department_names = []
        //populating department_names with the choices for prompt
        departments.forEach(department => {
          department_names.push(department.department_name)
        })
        //prompt the user with the deptartment names as choices
        prompt([
          {
            type: 'list',
            name: 'deptName',
            message: "Which Department would you like to view?",
            choices: department_names
          }
        ])
        .then(({deptName})=>{
          //run query to get all employees in a deptarment
          getEmployeesByDepartment(deptName, dept =>{
            console.table(dept)
            init()
          })
        })
        .catch(error =>console.error(error))
      })
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