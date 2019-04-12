const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const Page = require('../../../models/pages');
router.post('/', function(req, res, next) {
  const { name } = req.body
  Page.findOne({ name })
    .then((page) => {
      if (!page) {
        if (req.user.lv) throw new Error(`페이지 ${name} 생성이 안되었습니다`)
        return Page.create({ name, title: name })
      }
      if (page.lv < req.user.lv) throw new Error(`페이지 ${name} 이용 자격이 없습니다.`)
      return Page.updateOne({ _id: page._id }, { $inc: { inCnt: 1 } })
    })
    .then(() => {
      res.send({ success: true, d: req.user, token: req.token })
    })
    // 403 Forbidden
    .catch(err => next(createError(403, err.message)))
});

// 404 Not Found
// router.all('*', function(req, res, next) {
//   next(createError(404, '그런 api 없어'));
// });

router.all('*', require('../notFound'));

module.exports = router;
