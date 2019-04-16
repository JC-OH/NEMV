const express = require('express');
const router = express.Router();
const User = require('../../../../models/users');


router.get('/', function(req, res, next) {
  // [백엔드 비밀번호 노출 제거]
  // 백엔드에서 전체 컬럼을 보내지 않고 지정 컬럼만 보내야 하는거죠. 그것을 프로젝션이라고 합니다.(rdbms 의 select 뒷부분)
  // 몽구스에서는 쿼리빌더(?) 기능으로 쉽게 지정 컬럼을 선택할 수 있습니다.
  User.find().select('-pwd')
    .then(data => {
      res.send({ success: true, users: data , token: req.token})
    })
    .catch(err => {
      res.send({ success: false })
    })
})

router.put('/:_id', function(req, res, next) {
  const _id = req.params._id;

  // 회원 수정에서 req.body를 통째로 넣어서 아무값이나 수정하게 만들었습니다.
  User.updateOne( { _id }, { $set: req.body })
    .then((rst) => {
      res.send({ success: true, msg: rst , token: req.token});
    })
    .catch((err) => {
      res.send({ success: false, msg: err.message });
    })
})

router.delete('/:_id', function(req, res, next) {
  const _id = req.params._id;
  User.deleteOne( { _id })
    .then((rst) => {
      res.send({ success: true, msg: rst , token: req.token});
    })
    .catch((err) => {
      res.send({ success: false, msg: err.message });
    })
})

router.all('*', require('../../notFound'));

module.exports = router;
