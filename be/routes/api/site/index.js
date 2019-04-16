const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const Site = require('../../../models/sites')

router.get('/', (req, res, next) => {
  // 데이터는 하나 밖에 없으니 findOne이고 받은 값 전송하면 끝인 겁니다.
  Site.findOne({})
    .then(site => {
      res.send({ success: true, site: site, token: req.token});
    })
    .catch(err => {
      res.send({ success: false, msg: err.message });
    });
});
router.all('*', require('../notFound'));

module.exports = router;
