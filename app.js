//Bring in routes
const { getEmployees, getEmployeesByDepartment, getEmployeesByManager, getEmployeesWithID, getEmployeeNames, getEmployeeByName, getAllManagers, createEmployee, updateEmployee, deleteEmployee } = require('./controllers/employeeController.js')
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
      choices: ['View all Employees', 'View all Employees by Department', 'View all Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'EXIT']
    }
  ])
  switch (choice) {
    case 'View all Employees':
      getEmployees(employees => {
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
          employees = replaceManagerID(names, employees)
          console.table(employees)
          init()
        })
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
      getAllManagers(managers =>{
        //updates array to only employee whole names
        let managerNames = managers
        managerNames = managerNames.map(element=> element.whole_name)
        prompt([
          {
            type: 'list',
            name: 'manager',
            message: 'Choose a Manager.',
            choices: managerNames
          }
        ])
        .then(({manager})=>{
          let id
          managers.forEach(element=>{
            if(element.whole_name===manager){
              id=element.employee_id
            }
          })
          getEmployeesByManager(id, data=>{
            console.table(data)
            init()
          })
        })
        .catch(error=> console.error(error))
      })
      break
    case 'Add Employee':
      getEmployeeNames(employees=>{
        //only taking the names
        employees = employees.map(element => element.whole_name)
        // provide a none option
        employees.push('None')
        getRoles(roles =>{
          roles = roles.map(element => element.role_title)
          prompt([
            {
              type: 'input',
              name: 'first_name',
              message: `What is the new Employee's first name?`
            },
            {
              type: 'input',
              name: 'last_name',
              message: `What is the new Employee's last name?`
            },
            {
              type: 'list',
              name: 'role',
              message: `What is the new Employee's role?`,
              choices: roles
            },
            {
              type: 'list',
              name: 'manager',
              message: `Who is the new Employee's Manager (Select None for no manager)?`,
              choices: employees
            }
          ])
          .then(({first_name, last_name, role, manager})=>{
            getRole(role, data=>{
              let role_id = data[0].role_id
              if(manager==='None'){
                createEmployee(
                  {
                    first_name: first_name,
                    last_name: last_name,
                    role_id: role_id
                  }, () =>{
                    console.log('Employee Successfully Created!')
                    init()
                  })
              }else{
                //need to get manager id given manager name
                getEmployeeByName(manager, data => {
                  //only getting employeeID
                  let id = data[0].employee_id
                  createEmployee(
                    {
                      first_name: first_name,
                      last_name: last_name,
                      role_id: role_id,
                      manager_id: id
                    }, () => {
                      console.log(`${first_name} ${last_name} has joined your team!`)
                      init()
                    })
                })
              }
            })
          })
          .catch(error=>console.error(error))
          //End of getRoles
        })
        //end of getEmployeeNames
      })
      break
    case 'Remove Employee':
      //returns whole names of employees in order to fill up choices in prompt
      getEmployeeNames(employees=>{
        employees = employees.map(element => element.whole_name)
        prompt([
          {
            type: 'list',
            name: 'choice',
            message: 'Who would you like to Remove?',
            choices: employees
          }
        ])
        .then(({choice})=>{
          deleteEmployee(choice, ()=>{
            console.log(`${choice} has been fired!`)
            init()
          })
        })
        .catch(error=>console.error(error))
      })
      break
    case 'Update Employee Role':
        //getting all employee names to populate prompt choices
      getEmployeeNames(employees =>{
        //making array of only employee titles
        employees = employees.map(element=> element.whole_name)
        //getting all roles to populate prompt choices
        getRoles(roles =>{
          //making an array of only role_titles
          roles = roles.map(element=> element.role_title)
          prompt([
            {
              type: 'list',
              name: 'employee',
              message: 'Whose role do you want to update?',
              choices: employees
            },
            {
              type: 'list',
              name: 'role',
              message: 'Choose a new role',
              choices: roles
            }
          ])
          .then(({employee, role})=>{
            //have to get role id
            getRole(role, data=>{
              let id = data[0].role_id
              //run put call
              updateEmployee(employee, {role_id: id}, ()=>{
                console.log(`${employee}'s role has been updated to ${role}`)
                init()
              })
            })
          })
          .catch(error=>console.error(error))
        })
      })
      break
    case 'Update Employee Manager':
      //getting all employee full names
      getEmployeeNames(employees=>{
        employees = employees.map(element=>element.whole_name)
        let managerList = employees
        //giving option to remove manager
        managerList.push('NONE')
        prompt([
          {
            type:'list',
            name: 'employee',
            message: 'Who do you want to assign a Manager to?',
            choices: employees
          },
          {
            type:'list',
            name: 'manager',
            message: 'Who will be their new Manager?',
            choices: managerList
          }
        ])
        .then(({employee, manager})=>{
          if(employee===manager){
            //checking if the employee is being assigned themself as their manager
            console.log('Error, they cannot be their own Manager!')
            init()
          }
          //check if removing a manager
          else if(manager==='NONE'){
            updateEmployee(employee, {manager_id: null}, ()=>{
              console.log('Manager has been removed')
              init()
            })
          }else{
            //getting manager id
            getEmployeeByName(manager, data=>{
              let id = data[0].employee_id
              updateEmployee(employee, {manager_id: id}, ()=>{
                console.log(`${employee}'s new Manager is now ${manager}`)
                init()
              })
            })
          }
        })
        .catch(error=>console.error(error))
      })
      break
      case 'EXIT':
        console.log('GoodBye!')
        process.exit()
        break
  }
}


init()