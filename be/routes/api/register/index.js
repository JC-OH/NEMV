const express = require('express');
const router = express.Router();

const User = require('../../../models/users');

router.post('/', (req, res, next) => {
  const user = req.body;
  if (!user.id) return res.send({ success: false, msg: '아이디가 없습니다.'});
  if (!user.pwd) return res.send({ success: false, msg: '비밀번호가 없습니다.'});
  if (!user.name) return res.send({ success: false, msg: '이름이 없습니다.'});

  User.findOne( { id: user.id })
    .then(data => {
      if (data) throw new Error('이미 등록되어 있는 아이디입니다.')
      return User.create(user);
    })
    .then(rst => {
      res.send({ success: true });
    })
    .catch(err => {
      res.send({ success: false, msg: err.message })
    })
});

router.all('*', require('../notFound'));

module.exports = router;
