const router = require('express').Router()

router.use('/api', require('./employeeRoutes.js'))
router.use('/api', require('./roleRoutes.js'))
router.use('/api', require('./departmentRoutes.js'))

module.exports = router