const db = require('../config/db.js')

const department = {
  // get all departments
  getDepartments(callback) {
    db.query('SELECT * FROM departments', (error, departments)=>{
      if(error) throw error
      callback(departments)
    })
  },
  // Get one department by deptartment name
  getDepartment(departmentName, callback) {
    db.query('SELECT * FROM departments WHERE ?',{department_name: departmentName}, (error, dept)=>{
      if(error) throw error
      callback(dept)
    })
  },
  // create an Department
  createDepartment(departmentInfo, callback) {
    //Department info must be passed in as an object with all the necessary info
    db.query('INSERT INTO departments SET ?', departmentInfo, error=>{
      if(error) throw error
      callback()
    })
  },
  // update Department
  updateDepartment(id, updates, callback) {
    db.query('UPDATE departments SET ? WHERE ?', [updates, {department_id: id}], error=>{
      if(error) throw error
      callback()
    })
  },
  // delete Department
  deleteDepartment(id, callback) {
    db.query('DELETE FROM departments WHERE ?', {department_id: id}, error=>{
      if(error) throw error
      callback()
    })
  }
}

module.exports = department