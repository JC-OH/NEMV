const mongoose = require('mongoose')
const config = require('../../config')

// [몽구스 워닝메세지 제거]
// 그동안 DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead. 메세지가 계속 떴을 텐데요.
//
// 스키마에 있는 index: true 가 ensureIndex 같은 이상한 짓을 한다는 것입니다.
//
// 버전업이되면 없어질 문제이긴 하지만 보기 싫으니 아래와 같이 넣어주면 워닝이 뜨지 않습니다.
mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    age: { type: Number, default: 1 },
    // NoSQL의 장점인 맘대로 컬럼늘리기를 해봅니다.
    // id, pwd(비밀번호), retry(재시도 횟수)를 추가했습니다.
    id: { type: String, default: '', unique: true, index: true },
    pwd: { type: String, default: '' },
    // [권한 레벨]
    // 0: 관리자(개발자 및 모든 권한을 가진 사용자)
    // 1: 슈퍼유저(회원가입 후 승격된 사용자)
    // 2: 일반유저(회원가입 후 기본 사용자)
    // 3: 손님(토큰 없이 요청하는 사용자)
    // 숫자 0을 최고권한으로 둔 이유는 그래야 계층을 밑으로 더 늘리기가 편해서 입니다.
    lv: { type: Number, default: 2 }, //add
    inCnt: { type: Number, default: 0 }, //add
    retry: { type: Number, default: 0 }
})

const User = mongoose.model('User', userSchema)

// [쓰레기 인덱스 정리]
// 기존에 name이 unique: true 였기 때문에 인덱스를 초기화하지 않으면 중복 에러가 납니다.
// 이렇게 인덱스를 지워버리고 주석 처리하면 됩니다.
//User.collection.dropIndexes({ name: 1 })
//User.deleteMany({});
// [어드민 계정 설정 준비]
// 서버 구동시 프라미스 체인을 이용해서 id를 찾고 없으면 만드는 것입니다.

User.findOne({ id: config.admin.id })
  .then((res) => {
    //if (!res) return User.create({ id: config.admin.id, pwd: config.admin.pwd, name: config.admin.name });
    // [권한 레벨]
    if (!res) return User.create({ id: config.admin.id, pwd: config.admin.pwd, name: config.admin.name, lv: 0  });
    return Promise.resolve(null);
  })
  .then((res) => {
    if (res) console.log(`admin:${res.id} created!`);
  })
  .catch((err) => {
    console.error(err.message)
  });

module.exports = User
