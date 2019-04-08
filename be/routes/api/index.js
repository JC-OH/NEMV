const router = require('express').Router()
const createError = require('http-errors')

router.use('/user', require('./user'));

router.all('*', require('./notFound'))

module.exports = router
