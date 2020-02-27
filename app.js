const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ues index.js in the routes folder and brings all routes from that file
app.use(require('./routes'))
