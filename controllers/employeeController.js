const db = require('../config/db.js')

const employee = {
  // get all employees
  getEmployees(callback) {
    db.query(`
    SELECT employees.employee_id, employees.first_name, employees.last_name, roles.role_title, departments.department_name, roles.salary
    FROM employees
    INNER JOIN roles
    ON employees.role_id = roles.role_id
    INNER JOIN departments
    ON roles.department_id = departments.department_id;`, (error, employees) =>{
      if(error) throw error
      callback(employees)
    })
  },
  // Get one employee by id
  getEmployee(id, callback) {
    db.query(`
    SELECT employees.employee_id, employees.first_name, employees.last_name, roles.role_title, departments.department_name, roles.salary
    FROM employees
    INNER JOIN roles
    ON employees.role_id = roles.role_id
    INNER JOIN departments
    ON roles.department_id = departments.department_id
    WHERE ?
    `, {employee_id: id}, (error, person)=>{
      if(error) throw error
      callback(person)
    })
  },
  // create an employee
  createEmployee(employeeInfo, callback) {
    //employee info must be passed in as an object with all the necessary info
    db.query('INSERT INTO employees SET ?', employeeInfo, error=>{
      if(error) throw error
      callback()
    })
  },
  // update employee
  updateEmployee(id, updates, callback) {
    db.query('UPDATE employees SET ? WHERE ?', [updates, {employee_id: id}], error=>{
      if(error) throw error
      callback()
    })
  },
  // delete employee
  deleteEmployee(id, callback) {
    db.query('DELETE FROM employees WHERE ?', {employee_id: id}, error=>{
      if(error) throw error
      callback()
    })
  }
}

module.exports = employee