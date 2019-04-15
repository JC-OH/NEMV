const router = require('express').Router()
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const createError = require('http-errors');

// [토큰 검사하기]
// 토큰 확인 함수를 만듭니다.
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {

    // token이 undefined 이면 손님으로 만듭니다.
    if (!token) resolve({ id: 'guest', name: '손님', lv: 3 });
    // 문자열 체크를 넣은 이유는 토큰이 없을때 ‘null’로 문자 4글자가 오기 때문입니다.
    // null도 손님으로 변경했습니다.(추후 개선이 필요합니다.)
    if ((typeof token) !== 'string') reject(new Error("문자가 아닌 토큰입니다."))
    if (token.length < 20) resolve({ id: 'guest', name: '손님', lv: 3 });

    jwt.verify(token, config.secretKey, (err, user) => {
      if (err) reject(err);
      resolve(user);
    })
  })
};

// /sign을 제외한 모든 api 요청은 .all에 걸립니다.
router.use('/sign', require('./sign'));

// 아무나 접근 가능한 api로 만듭니다.
router.use('/site', require('./site'));

// 회원가입 API 레지스터를 등록해줍니다.
router.use('/register', require('./register'));

router.all('*', function(req, res, next) {
  // 토큰 검사
  // authorization: '[object Object]',
  const token = req.headers.authorization;
  // 토큰을 확인하고 문제가 없다면 next로 아래로 내려갑니다.

  verifyToken(token)
    .then((user) => {
      console.log(user);
      req.user = user;
      next();
    })
    .catch((err) => {
      // 문제가 있다면 success: false와 에러메세지를 보내서 아래로 못내려가게 합니다.
      // 사실 인증 에러가 났을 때 success: false 같은 정상적인 데이터보다는
      // http 공식 에러메세지인 401 포비든으로 날려주는 것이 좋습니다.
      res.send( { success: false, msg: err.message } )
    })
});
router.use('/page', require('./page'))
router.use('/test', require('./test'));
router.use('/user', require('./user'));
router.use('/crud', require('./crud'));
router.use('/manage', require('./manage'));

router.all('*', require('./notFound'));

module.exports = router
