const router = require('express').Router()
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const createError = require('http-errors');

// [토큰 검사하기]
// 토큰 확인 함수를 만듭니다.
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secretKey, (err, user) => {
      if (err) reject(err);
      resolve(user);
    })
  })
};

// /sign을 제외한 모든 api 요청은 .all에 걸립니다.
router.use('/sign', require('./sign'));
router.all('*', function(req, res, next) {
  // 토큰 검사
  const token = req.headers.authorization;
  // 토큰을 확인하고 문제가 없다면 next로 아래로 내려갑니다.
  verifyToken(token)
    .then((user) => {
      console.log(user);
      next();
    })
    .catch((err) => {
      // 문제가 있다면 success: false와 에러메세지를 보내서 아래로 못내려가게 합니다.
      // 사실 인증 에러가 났을 때 success: false 같은 정상적인 데이터보다는
      // http 공식 에러메세지인 401 포비든으로 날려주는 것이 좋습니다.
      res.send( { success: false, msg: err.message } )
    })
});

router.use('/test', require('./test'));
router.use('/user', require('./user'));
router.use('/crud', require('./crud'));

router.all('*', require('./notFound'));

module.exports = router
