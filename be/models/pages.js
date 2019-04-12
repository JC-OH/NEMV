const mongoose = require('mongoose');
const config = require('../../config');

// DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);

const pageSchema = new mongoose.Schema({
  // 이름(name)은 ‘/home’ 같은 url을 등록하는 것입니다.
  name: { type: String, default: '', index: true },
  // 페이지 레벨과 페이지 조회수를 추가했습니다.
  inCnt: { type: Number, default: 0 },
  lv: { type: Number, default: 0 }
});

module.exports = mongoose.model('Page', pageSchema);
