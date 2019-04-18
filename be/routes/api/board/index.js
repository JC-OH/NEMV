const express = require('express');
const router = express.Router();
const Board = require('../../../models/boards');

router.get('/:name', (req, res, next) => {
  const name = req.params.name;

  Borard.findOne({ name })
    .then(board => {
      // 권한으로 못보게 하려면..
      // if (board.lv < req.lv) return res.send({ success: false, msg: `${name} 게시판을 볼 수 있는 자격이 없습니다.`})
      res.send({ success: true, d: board, token: req.token });
    })
    .catch(err => {
      res.send({ success: false, msg: err.message });
    })
});

router.all('*', require('../notFound'));

module.exports = router;
