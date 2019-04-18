const router = require('express').Router();
const config = require('../../../config');
const createError = require('http-errors');
const tokenHelper = require('../../helpers/token');

// /sign을 제외한 모든 api 요청은 .all에 걸립니다.
router.use('/sign', require('./sign'));

// 아무나 접근 가능한 api로 만듭니다.
router.use('/site', require('./site'));

// 회원가입 API 레지스터를 등록해줍니다.
router.use('/register', require('./register'));

// 이제 “아무나” 게시판 정보를 가져올 수 있습니다.
router.use('/board', require('./board'));

router.all('*', function(req, res, next) {
  // 토큰 검사
  // authorization: '[object Object]',
  const token = req.headers.authorization;
  // 토큰을 확인하고 문제가 없다면 next로 아래로 내려갑니다.

  // token.verify(token)
  //   .then((user) => {
  //     console.log(user);
  //     // { id: 'memi',
  //     //   lv: 0,
  //     //   name: '관리자',
  //     //   rmb: false,
  //     //   iat: 1541758540,
  //     //   exp: 1541758720,
  //     //   iss: 'xxx.com',
  //     //   sub: 'user-token' }
  //     // 발행시간(iat = 1541757507)과 만료시간(exp: 1541757687)의 차이는 딱 180 납니다.
  //     // 180초에는 못 쓰는 토큰인지 180초 후 아무데나 클릭해보면 됩니다.
  //     // 180초 후에는 jwt expired 가 뜨게 됩니다.
  //
  //     // new Date()는 미리세컨드 기준이기 때문에 1000을 곱해서 표현해 본 것입니다.
  //     console.log(new Date(user.exp * 1000));
  //
  //     const diff = moment(user.exp * 1000).diff(moment(), 'seconds')
  //     console.log("diff:", diff);
  //     // 이러다 60 이하 였을때 다시 180이 되게 만들어야겠죠?
  //
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => {
  //     // 문제가 있다면 success: false와 에러메세지를 보내서 아래로 못내려가게 합니다.
  //     // 사실 인증 에러가 났을 때 success: false 같은 정상적인 데이터보다는
  //     // http 공식 에러메세지인 401 포비든으로 날려주는 것이 좋습니다.
  //     res.send( { success: false, msg: err.message } )
  //   })

    // 토큰 검사
    tokenHelper.get(token)
      .then((v) => {
        console.log(v)
        req.user = v.user
        req.token = v.token
        next()
      })
      .catch(e => res.send({ success: false, msg: e.message }))
});
router.use('/page', require('./page'));
router.use('/test', require('./test'));
router.use('/user', require('./user'));
router.use('/crud', require('./crud'));
router.use('/manage', require('./manage'));

router.all('*', require('./notFound'));

module.exports = router
