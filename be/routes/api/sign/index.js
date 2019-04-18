var express = require('express');
var router = express.Router();
const crypto = require('crypto')
const config = require('../../../../config')
const User = require('../../../models/users')
const tokenHelper = require('../../../helpers/token')

router.post('/in', (req, res, next) => {
  const { id, pwd, remember } = req.body;

  if (!id) return res.send({ success: false, msg: '아이디가 없습니다.' });
  if (!pwd) return res.send({ success: false, msg: '비밀번호가 없습니다.' });

  // 1. 사용자 id로 찾습니다.
  User.findOne({ id: id })
    .then((user) => {
        // 2. 없거나 패스워드가 틀리면 에러메세지와 함께 success: false로 데이터를 전송합니다.
        // if (!res) throw new Error('존재하지 않는 아이디입니다.');
        // if (res.pwd !== pwd) throw new Error('비밀번호가 틀립니다.');
        if (!user) return res.send({ success: false, msg: '존재하지 않는 아이디입니다.' });
        //if (rst.pwd !== pwd) return res.send({ success: false, msg: '비밀번호가 틀립니다.' });
        const encrypted_pwd = crypto.scryptSync(pwd, user._id.toString(), 64, { N: 1024 }).toString('hex')
        if (user.pwd !== encrypted_pwd) throw new Error('비밀번호가 틀립니다.')

        // 3. 정상적인 경우에 id, age로 토큰을 만들어서 success: true와 토큰을 전달합니다.
        //return signToken(user.id, user.age);
        return tokenHelper.sign(user._id,user.id, user.lv, user.name, remember)
    })
    .then((rst) => {
      return res.send({ success: true, token: rst });
    })
    .catch((err) => {
      return res.send({ success: false, msg: err.message });
    });
})

router.post('/out', (req, res, next) => {
  res.send({ success: false, msg: '아직 준비 안됨.'})
})

router.all('*', require('../notFound'));

module.exports = router;
