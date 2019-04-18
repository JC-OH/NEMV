const express = require('express');
const router = express.Router();
const Article = require('../../../models/articles');

router.get('/list/:_board', (req, res, next) => {
  const _board = req.params._board

  const f = {}
  if (_board) f._board = _board

  Article.find(f).select('-content').populate('_user', '-pwd')
    .then(rs => {
      res.send({ success: true, ds: rs, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })

    router.get('/read/:_id', (req, res, next) => {
      const _id = req.params._id

      Article.findById(_id).select('content')
        .then(r => {
          res.send({ success: true, d: r, token: req.token })
        })
        .catch(e => {
          res.send({ success: false, msg: e.message })
        })
    })
  })


router.all('*', require('../notFound'));

module.exports = router;
