const express = require('express');
const router = express.Router();


router.use('/user', require('./user'))
router.use('/page', require('./page'))

// router.all('*', (req, res, next) => {
//   res.send({ success: true, msg: "manage" })
// });


// var createError = require('http-errors');
// router.all('*', function(req, res, next) {
//   next(createError(404, '그런 api 없어'));
// });

router.all('*', require('../notFound'))

module.exports = router;
