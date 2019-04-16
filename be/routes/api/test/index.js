var express = require('express');
var router = express.Router();

router.all('*', (req, res, next) => {
  res.send({ success: true, msg: "test" , token: req.token})
})

module.exports = router;
