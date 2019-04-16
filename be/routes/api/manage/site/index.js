const express = require('express');
const router = express.Router();
const Site = require('../../../../models/sites')

router.get('/', (req, res, next) => {
  Site.find()
    .then(sites => {
      res.send({ success: true, sites: sites , token: req.token})
    })
    .catch(err => {
      res.send({ success: false, msg: err.message })
    });
});

router.put('/:_id', (req, res, next) => {
  const _id = req.params._id;
  // console.log(req.params._id);
  // console.log(req.body);
  Site.updateOne({ _id }, { $set: req.body })
    .then(rst => {
      res.send({ success: true, msg: rst , token: req.token})
    })
    .catch(err => {
      res.send({ success: false, msg: err.message })
    });
});

router.delete('/:_id', (req, res, next) => {
  const _id = req.params._id;

  Site.deleteOne({ _id })
    .then()
    .catch(err => {
      res.send({ success: false, msg: err.message })
    });
})

router.all('*', require('../../notFound'));

module.exports = router;
