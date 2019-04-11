const router = require('express').Router()
const createError = require('http-errors')

router.use('/user', require('./user'));
router.use('/crud', require('./crud'));
router.use('/sign', require('./sign'));

router.all('*', require('./notFound'));

module.exports = router
