const mongoose = require('mongoose');
const config = require('../../config');

mongoose.set('useCreateIndex', true)
const boardSchema = new mongoose.Schema({
  // 헷갈릴 수 있으니 같은 게시판명은 피하려고 이름에 유니크를 넣었습니다.
  name: { type: String, default: '', index: true, unique: true },
  // 권한은 기본값으로 관리자만 쓸 수 있게 만듭니다. 전체 사용가로 바꾸려면 lv: 3로 나중에 변경하면 됩니다.
  lv: { type: Number, default: 0 },
  rmk: { type: String, default: '' }
});

module.exports = mongoose.model('Board', boardSchema);
