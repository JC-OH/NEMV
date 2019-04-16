const express = require('express');
const crypto = require('crypto')
const router = express.Router();

const User = require('../../../models/users');

router.post('/', (req, res, next) => {
  const user = req.body;
  if (!user.id) return res.send({ success: false, msg: '아이디가 없습니다.'});
  if (!user.pwd) return res.send({ success: false, msg: '비밀번호가 없습니다.'});
  if (!user.name) return res.send({ success: false, msg: '이름이 없습니다.'});

  User.findOne( { id: user.id })
    .then(data => {
      if (data) throw new Error('이미 등록되어 있는 아이디입니다.');
      // 회원을 만들고 일반 비밀번호로 저장한 후
      return User.create(user);
    })
    .then(data => {
      // [단방향 암호화 - crypto.scryptSync]
      // password: 입력 문자(비밀번호)
      // salt: 풀기 어렵게 만들기
      // keyLen: 바이트수
      // Option: 암호화 방법등 여러가지
      // 저장된 회원정보의 _id(소금)를 이용해 암호화 된 비밀번호를 다시 저장하는 것입니다.
      // _id는 몽고디비의 오브젝트키 라는 형이기 때문에 toString()으로 꼭 문자열로 변경해야합니다.
      const pwd = crypto.scryptSync(data.pwd, data._id.toString(), 64, { N: 1024 }).toString('hex');
      return User.updateOne({ _id: data._id }, { $set: { pwd } })
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
