const db = require('../config/db.js')

const employee = {
  // get all employees
  getEmployees(callback) {
    db.query(`
    SELECT employees.employee_id, employees.first_name, employees.last_name, roles.role_title, departments.department_name, roles.salary, manager_id
    FROM employees
    INNER JOIN roles
    ON employees.role_id = roles.role_id
    INNER JOIN departments
    ON roles.department_id = departments.department_id;`, (error, employees) =>{
      if(error) throw error
      callback(employees)
    })
  },
  // Get all employees by deptartment
  getEmployeesByDepartment(deptName, callback) {
    db.query(`
    SELECT employees.employee_id, employees.first_name, employees.last_name, roles.role_title, departments.department_name, roles.salary
    FROM employees
    INNER JOIN roles
    ON employees.role_id = roles.role_id
    INNER JOIN departments
    ON roles.department_id = departments.department_id
    WHERE ?
    `, {department_name: deptName}, (error, employees)=>{
      if(error) throw error
      callback(employees)
    })
  },
  //get All Employees under a manager by ID
  getEmployeesByManager(id, callback) {
    db.query(`
    SELECT employees.first_name, employees.last_name FROM employees
    WHERE ?`, {manager_id: id}, (error, employees)=>{
      if(error) throw error
      callback(employees)
    })
  },
  //get all employees and their ID
  getEmployeesWithID(callback){
    db.query('SELECT employees.employee_id, employees.first_name, employees.last_name FROM employees', (error, employees)=>{
      if(error) throw error
      callback(employees)
    })

  },
  //returns first name combined with last name and puts those values in a whole_name column
  getEmployeeNames(callback){
    db.query(`SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS whole_name FROM employees`, (error, employees)=>{
      if(error) throw error
      callback(employees)
    })
  },
  //get employee by their full name
  getEmployeeByName(fullname, callback){
    db.query(`
    SELECT * FROM employees
    WHERE CONCAT(employees.first_name, ' ', employees.last_name) = '${fullname}';`, (error, employee)=>{
      if(error) throw error
      callback(employee)
    })
  },
  //return all managers
  getAllManagers(callback){
    db.query(`
    SELECT employees.employee_id, CONCAT(employees.first_name, ' ', employees.last_name) AS whole_name FROM employees
    WHERE employees.employee_id IN (SELECT DISTINCT manager_id FROM employees
    WHERE manager_id IS NOT NULL);
    `, (error, managers)=>{
      if(error) throw error
      callback(managers)
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
  // update employee given fullname
  updateEmployee(fullname, updates, callback) {
    db.query(`
      UPDATE employees
      SET ?
      WHERE CONCAT(employees.first_name, ' ', employees.last_name) = '${fullname}';`, updates, error=>{
      if(error) throw error
      callback()
    })
  },
  // delete employee
  deleteEmployee(fullname, callback) {
    db.query(`DELETE FROM employees WHERE CONCAT(employees.first_name, ' ', employees.last_name) = '${fullname}';`, error=>{
      if(error) throw error
      callback()
    })
  }
}

module.exports = employee