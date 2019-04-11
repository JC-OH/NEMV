const router = require('express').Router()
const createError = require('http-errors')

router.use('/sign', require('./sign'));
router.all('*', function(req, res, next) {
  // 토큰 검사
  next()
});
router.use('/user', require('./user'));
router.use('/crud', require('./crud'));


router.all('*', require('./notFound'));

module.exports = router
