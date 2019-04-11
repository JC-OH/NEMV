var express = require('express');
var router = express.Router();

router.all('*', (req, res, next) => {
  res.send({ success: true, msg: "test"})
})

module.exports = router;
