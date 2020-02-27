const db = require('../config/db.js')

const employee = {
  // get all employees
  getEmployees(callback) {
    db.query(`
    Use employees_db;
    SELECT employees.employee_id, employees.first_name, employees.last_name, roles.role_title, departments.department_name, roles.salary
    FROM employees
    INNER JOIN roles
    ON employees.role_id = roles.role_id
    INNER JOIN departments
    ON roles.department_id = departments.department_id;
    `), (error, employees=>{
      if(error) throw error
      callback(employees)
    })
  },
  // Get one employee by id
  getEmployee(id, callback){
    db.query(`
    Use employees_db;
    SELECT employees.employee_id, employees.first_name, employees.last_name, roles.role_title, departments.department_name, roles.salary
    FROM employees
    INNER JOIN roles
    ON employees.role_id = roles.role_id
    INNER JOIN departments
    ON roles.department_id = departments.department_id
    WHERE ?;
    `, {employee_id: id}, (error, person)=>{
      if(error) throw error
      callback(person)
    })
  },
  // create an employee
  createEmployee(employeeInfo, callback){
    
  },
}
