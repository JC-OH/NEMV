var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/users')
//---------------------------------------------------
// Get
//---------------------------------------------------
router.get('/', function(req, res, next) {

  User.find()
    .then(data => {
      res.send({ success: true, users: data , token: req.token})
    })
    .catch(err => {
      res.send({ success: false, msg: err.message  })
    })
});

//---------------------------------------------------
// Create
//---------------------------------------------------
router.post('/', (req, res, next) => {
  const { name, age } = req.body
  const user = new User({ name, age })
  user.save()
    .then(res => {
      res.send({ success: true, msg: res , token: req.token})
    })
    .catch(err => {
      res.send({ success: false, msg: err.message })
    })
})

//---------------------------------------------------
// Update
//---------------------------------------------------
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const { name, age } = req.body;
  User.updateOne({ _id: id}, { $set: { name: name, age: age } })
    .then(res => {
      res.send({ success: true, msg: res , token: req.token})
    })
    .catch(err => {
      res.send({ success: false, msg: err.message })
    })
});

//---------------------------------------------------
// Delete
//---------------------------------------------------
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  User.deleteOne({ _id: id })
    .then(res => {
      res.send({ success: true, msg: res , token: req.token})
    })
    .catch(err => {
      res.send({ success: false, msg: err.message })
    })
});


router.all('*', require('../notFound'));

module.exports = router;
