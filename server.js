//below returns the data of first name, last name, title, and salary where the employee role id = id in the roles table
// USE employees_db;
// SELECT employees.first_name, employees.last_name, roles.title, roles.salary
// FROM employees, roles
// WHERE employees.role_id = roles.id;

const express = require('express')
const {join} = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(join(__dirname, 'public')))

// inds index.js in the routes folder and brings all routes from that file
app.use(require('./routes'))
app.listen(process.env.PORT || 3000)