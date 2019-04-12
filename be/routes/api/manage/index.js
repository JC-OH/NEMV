const express = require('express');
const router = express.Router();

// 페이지 검사 후 레벨로 다른 api들에 대한 접근을 막을 수 있습니다.
router.all('*', function(req, res, next) {
  // 또 검사해도 됨
  if (req.user.lv > 2) return res.send({ success: false, msg: '권한이 없습니다.' })
  next()
})

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
