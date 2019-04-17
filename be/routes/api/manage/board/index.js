const express = require('express');
const router = express.Router();
const Board = require('../../../../models/boards');

router.post('/', (req, res, next) => {
    const { name, lv, rmk } = req.body;
    Board.create({ name, lv, rmk })
      .then(board => {
        res.send({ success: true, msg: board, token: req.token })
      })
      .catch(err => {
        res.send({ success: false, msg: err.message });
      });
});

router.get('/', (req, res, next) => {
  Board.find()
    .then(boards => {
      res.send({ success: true, ds: boards, token: req.token })
    })
    .catch(err => {
      res.send({ success: false, msg: err.message });
    });
});

router.put('/:_id', (req, res, next) => {
    const _id = req.params._id;
    Board.updateOne({ _id }, { $set: req.body })
      .then(rst => {
        res.send({ success: true, msg: rst, token: req.token })
      })
      .catch(err => {
        res.send({ success: false, msg: err.message });
      });
});

router.delete('/:_id', (req, res, next) => {
    const _id = req.params._id;
    Board.deleteOne({ _id })
      .then(rst => {
        res.send({ success: true, msg: rst, token: req.token })
      })
      .catch(err => {
        res.send({ success: false, msg: err.message });
      });
});

router.all('*', require('../../notFound'));
module.exports = router;
