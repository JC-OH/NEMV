const mongoose = require('mongoose')

// []몽구스 워닝메세지 제거]
// 그동안 DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead. 메세지가 계속 떴을 텐데요.
//
// 스키마에 있는 index: true 가 ensureIndex 같은 이상한 짓을 한다는 것입니다.
//
// 버전업이되면 없어질 문제이긴 하지만 보기 싫으니 아래와 같이 넣어주면 워닝이 뜨지 않습니다.
mongoose.set('useCreateIndex', true)

const userSchema = new mongoose.Schema({
    name: { type: String, default: '', unique: true, index: true },
    age: { type: Number, default: 1 }
})

const User = mongoose.model('User', userSchema)

module.exports = User
