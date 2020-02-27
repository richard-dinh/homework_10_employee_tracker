const db = require('../config/db.js')

const role = {
  // get all roles
  getRoles(callback) {
    db.query(`
    SELECT roles.role_title, roles.salary, departments.department_name
    FROM roles
    INNER JOIN departments
	  ON roles.department_id = departments.department_id;`, (error, roles) => {
      if (error) throw error
      callback(roles)
    })
  },
  // Get one role by role title
  getRole(roleTitle, callback) {
    db.query(`
    SELECT roles.role_title, roles.salary, departments.department_name
    FROM roles
    INNER JOIN departments
    ON roles.department_id = departments.department_id
    WHERE ?`, { role_title: roleTitle }, (error, job) => {
      if (error) throw error
      callback(job)
    })
  },
  // create a role
  createRole(roleInfo, callback) {
    //Role info must be passed in as an object with all the necessary info
    db.query('INSERT INTO roles SET ?', roleInfo, error => {
      if (error) throw error
      callback()
    })
  },
  // update role
  updateRole(id, updates, callback) {
    db.query('UPDATE roles SET ? WHERE ?', [updates, { role_id: id }], error => {
      if (error) throw error
      callback()
    })
  },
  // delete Role
  deleteRole(id, callback) {
    db.query('DELETE FROM roles WHERE ?', { role_id: id }, error => {
      if (error) throw error
      callback()
    })
  }
}

module.exports = role