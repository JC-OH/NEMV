const jwt = require('jsonwebtoken');
const config = require('../../config')
const crypto = require('crypto');
const moment = require('moment');
const createError = require('http-errors');

//id, age와 config.secretKey로 토큰을 만드는 함수를 만듭니다.
const signToken = (id, lv, name, remember) => {
  const opts = {
    issuer: config.jwt.issuer,
    subject: config.jwt.subject,
    expiresIn: config.jwt.expiresIn, // 3분
    algorithm: config.jwt.algorithm,
    //expiresIn: exp
  }
  // 기억하기를 눌렀으면 7일짜리 안눌렀으면 3분짜리 유효기간을 가지고 있습니다.
  if (remember) opts.expiresIn = config.jwt.expiresInRemember // 6일

  return new Promise((resolve, rejest) => {
    // https://www.npmjs.com/package/jsonwebtoken
    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    // options:
    //
    // algorithm (default: HS256)
    // expiresIn: expressed in seconds or a string describing a time span zeit/ms.
    // Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").
    //
    // notBefore: expressed in seconds or a string describing a time span zeit/ms.
    // Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").
    //
    // audience
    // issuer
    // jwtid
    // subject
    // noTimestamp
    // header
    // keyid
    // mutatePayload: if true, the sign function will modify the payload object directly. This is useful if you need a raw reference to the payload after claims have been applied to it but before it has been encoded into a token.
    jwt.sign({ id, lv, name, remember }, config.jwt.secretKey, opts, (err, token) => {
      if (err) reject(err);
      resolve(token);
    })
  })
}


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

    jwt.verify(token, config.jwt.secretKey, (err, user) => {
      if (err) reject(err);
      resolve(user);
    })
  })
};

// getToken이라는 어씽크 함수를 만들었습니다.
const getToken = async(t) => {
  // 토큰 풀기를 해서 정보를 가져오고 기다립니다.
  let vt = await verifyToken(t)
  //토큰이 손님 권한이면(vt.exp > 2) 그냥 나갑니다.
  if (vt.lv > 2) return { user: vt, token: null }
  //시간차를 구합니다.
  const diff = moment(vt.exp * 1000).diff(moment(), 'seconds')
  // return vt
  console.log(diff)
  // 60초보다 클 경우 사용자 정보와 토큰이 없다는 결과를 주며 나옵니다.
  // if (diff > (vt.exp - vt.iat) / config.jwt.expiresInDiv) return { user: vt, token: null }
  //
  // // 그렇지 않을 경우 기존 정보로 다시 토큰을 만듭니다.
  // const nt = await signToken(vt.id, vt.lv, vt.name, vt.rmb)
  // vt = await verifyToken(nt)
  // return { user: vt, token: nt }
  const expSec = (vt.exp - vt.iat)
  if (diff > expSec / config.jwt.expiresInDiv) return { user: vt, token: null }

  const nt = await signToken(vt.id, vt.lv, vt.name, expSec)
  vt = await verifyToken(nt)
  return { user: vt, token: nt }
};

module.exports = {
  sign: signToken,
  get: getToken,
  verify: verifyToken
}
