const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
const articleSchema = new mongoose.Schema({
  title: { type: String, default: '', index: true },
  content: { type: String, default: '' },
  cnt: {
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 }
  },
  ip: { type: String, default: '' },
  comments: [],
  // mongoose.Schema.Types.ObjectId 라는 형식을 가지고 있습니다.
  // 레퍼런스(ref) 로 모델을 가르키고 있는 형태입니다.
  // 바로 User._id, Board._id 를 보관하겠다는 것입니다.
  // 게시물의 작성자와 어떤 형식인지를 _id만 보관 해서 사용하는 것입니다.
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  _board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', index: true }
})

module.exports = mongoose.model('Article', articleSchema)
