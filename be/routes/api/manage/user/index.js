const express = require('express');
const router = express.Router();
const User = require('../../../../models/users');


router.get('/', function(req, res, next) {
  User.find()
    .then(data => {
      res.send({ success: true, users: data })
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
      res.send({ success: true, msg: rst });
    })
    .catch((err) => {
      res.send({ success: false, msg: err.message });
    })
})

router.delete('/:_id', function(req, res, next) {
  const _id = req.params._id;
  User.deleteOne( { _id })
    .then((rst) => {
      res.send({ success: true, msg: rst });
    })
    .catch((err) => {
      res.send({ success: false, msg: err.message });
    })
})

router.all('*', require('../../notFound'));

module.exports = router;
