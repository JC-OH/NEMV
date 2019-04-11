var express = require('express');
var router = express.Router();

router.post('/in', (req, res, next) => {
  const { id, pwd } = req.body;

  if (!id) return res.send({ success: false, msg: '아이디가 없습니다.' });
  if (!pwd) return res.send({ success: false, msg: '비밀번호가 없습니다.' });

  return res.send({ success: true, token: 'temp token!!'  })
})

router.post('/out', (req, res, next) => {
  res.send({ success: false, msg: '아직 준비 안됨.'})
})

router.all('*', require('../notFound'));

module.exports = router;
