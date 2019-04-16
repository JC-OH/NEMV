const express = require('express');
const router = express.Router();
const Page = require('../../../../models/pages');

router.get('/', function(req, res, next) {
  Page.find()
    .then((data) => {
      res.send({ success: true, pages: data , token: req.token});
    })
    .catch((err) => {
      res.send({ success: false, msg: err.message });
    })
});

router.put('/:_id', function(req, res, next) {
  const _id = req.params._id;
  Page.updateOne( { _id }, { $set: req.body })
    .then((rst) => {
      res.send({ success: true, msg: rst , token: req.token})
    })
    .catch((err) => {
        res.send({ success: false, msg: err.message });
    })
});

router.delete('/:_id', function(req, res, next) {
  const _id = req.params._id;

  Page.deleteOne({ _id })
    .then((rst) => {
      res.send({ success: true, msg: rst , token: req.token})
    })
    .catch((err) => {
      res.send({ success: false, msg: err.message })
    })
});

router.all('*', require('../../notFound'));

module.exports = router;
