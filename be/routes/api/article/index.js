const express = require('express');
const router = express.Router();
const Board = require('../../../models/boards');
const Article = require('../../../models/articles');
const Comment = require('../../../models/comments');

// [쓰기]
router.post('/:_board', (req, res, next) => {
  const _board = req.params._board
  if (!_board) return res.send({ success: false, msg: '게시판이 선택되지 않았습니다' }) // 나중에 400 bad request 처리 예제
  const { title, content } = req.body
  Board.findOne({ _id: _board })
    .then(r => {
      if (!r) return res.send({ success: false, msg: '잘못된 게시판입니다' })
      // 이 게시판에 쓸 자격이 있는지 판단합니다.
      if (r.lv < req.user.lv) return res.send({ success: false, msg: '권한이 없습니다' })
      // 자격이 있다면 게시물을 만듭니다.
      const atc = {
        title,
        content,
        _board,
        ip: '1.1.1.1',//req.ip,
        _user: null
      }
      // 게시물을 만들 때 req.user._id 가 없다는 것은 손님 레벨이므로 null이 됩니다.
      if (req.user._id) atc._user = req.user._id
      return Article.create(atc)
    })
    .then(r => {
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

// [수정하기]
router.put('/:_id', (req, res, next) => {
  // 손님(!req.user._id or req.user.lv ===3 )은 수정이 안됩니다.
  if (!req.user._id) return res.send({ success: false, msg: '게시물 수정 권한이 없습니다' })
  const _id = req.params._id

  Article.findOne({ _id })
    .then(r => {
      // 해당 게시물을 먼저 찾아서 권한 체크를 합니다.
      if (!r) throw new Error('게시물이 존재하지 않습니다')
      // 본인이 작성한 게시물만 수정됩니다.(관리자도 수정이 안됨)
      if (r._user.toString() !== req.user._id) throw new Error('본인이 작성한 게시물이 아닙니다')
      return Article.findOneAndUpdate({ _id }, { $set: req.body}, { new: true })
    })
    .then(r => {
      // 수정된 결과를 전송합니다.(findOneAndUpdate)
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

// [삭제하기]
router.delete('/:_id', (req, res, next) => {
  // 손님(!req.user._id or req.user.lv ===3 )은 삭제가 안됩니다.
  if (!req.user._id) return res.send({ success: false, msg: '게시물 수정 권한이 없습니다' })
  const _id = req.params._id

  Article.findOne({ _id }).populate('_user', 'lv')
    .then(r => {
      if (!r) throw new Error('게시물이 존재하지 않습니다')
      // 삭제가 가능한지 여부를 판단하기위해 찾습니다.
      // 본인은 아니지만 권한이 높은 사용자는 삭제가 가능합니다.(eg: lv1은 lv2,3 게시물을 삭제할 수 있음)
      if (r._user.toString() !== req.user._id) {
        if (r._user.lv < req.user.lv) throw new Error('본인이 작성한 게시물이 아닙니다')
      }
      return Article.deleteOne({ _id })
    })
    .then(r => {
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})
// [게시물 목록 읽기]
// router.get('/list/:_board', (req, res, next) => {
//   const _board = req.params._board
//
//   const f = {}
//   if (_board) f._board = _board
//   // .select(‘-content’) 으로 내용을 제거한 결과를 보냅니다.
//   Article.find(f).select('-content').populate('_user', '-pwd')
//     .then(rs => {
//       res.send({ success: true, ds: rs, token: req.token })
//     })
//     .catch(e => {
//       res.send({ success: false, msg: e.message })
//     })
// })
router.get('/list/:_board', (req, res, next) => {
  const _board = req.params._board
  let { search, sort, order, skip, limit } = req.query
  if (!(sort && order && skip && limit)) return res.send({ success: false, msg: '잘못된 요청입니다' })
  if (!search) search = ''
  order = parseInt(order)
  limit = parseInt(limit)
  skip = parseInt(skip)
  const s = {}
  s[sort] = order

  const f = {}
  if (_board) f._board = _board
  let total = 0

  Article.countDocuments(f)
    .where('title').regex(search)
    .then(r => {
      total = r
      return Article.find(f)
        .where('title').regex(search)
        .sort(s)
        .skip(skip)
        .limit(limit)
        .select('-content')
        .populate('_user', '-pwd')
    })
    .then(rs => {
      res.send({ success: true, t: total, ds: rs, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})
// [읽기]
router.get('/:_board', (req, res, next) => {
  const _board = req.params._board

  const f = {}
  // 게시판이 지정 안되었을 경우(_board: null) 전체(f = {}) 를 불러 올 수도 있습니다.
  if (_board) f._board = _board
  // 게시판이 지정된 게시물들을 읽습니다.

  // 게시물에 연결된 사용자 정보중 비밀번호는 빼고 전송합니다.
  Article.find(f).populate('_user', '-pwd')
    .then(rs => {
      res.send({ success: true, ds: rs, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
});

// [게시물 내용 읽기]
router.get('/read/:_id', (req, res, next) => {
  const _id = req.params._id

  // 기존 게시물 읽기 api에서 댓글과 같이 전송하기 위해 atc라는 변수를 하나 두고 댓글을 보태서 전송합니다.
  let atc = {}

  // .select(‘content’) 로 게시물 하나의 내용만 읽어서 전송합니다.
  // findById() findOne() 의 차이는 findById(id) = findOne({ _id: id }) 입니다 그냥 편의를 위해 몽구스에서 만든 것이죠.
  // Article.findById(_id).select('content')
  //   .then(r => {
  //     res.send({ success: true, d: r, token: req.token })
  //   })
  //   .catch(e => {
  //     res.send({ success: false, msg: e.message })
  //   })
  // 게시물을 가져올때 lean()을 썼는데 받은 값을 변경하기 위함입니다(몽구스 객체에서 오브젝트 변수형으로 변경). 없을 경우 atc.xxx = xx 같은 변경은 되지 않습니다.
  Article.findByIdAndUpdate(_id, { $inc: { 'cnt.view': 1 } }, { new: true }).lean()
  .select('content cnt')
  .then(r => {
    if (!r) throw new Error('잘못된 게시판입니다')
    atc = r
    atc._comments = []
    // 댓글을 찾을 때 해당 게시물 아이디로 찾고 사용자 정보를 같이 보내주기 위해 파퓰레이트 시켰습니다.(사용자 정보 중 패스워드 같은 것은 넣으면 안되니 id와 name만 선택하도록 했습니다.)
    // _id로 소트한다는 것은 발생 일시로 정렬한다는 것이죠.
    // limit(5)개로 임시로 넣어 둔 것입니다. 배열류 디비 조회는 항상 limit를 걸어 제한하는 것이 좋습니다. 만약 버그등으로 댓글이 10만개라면 백엔드서버 껏다 켜집니다.
    return Comment.find({ _article: atc._id }).populate({ path: '_user', select: 'id name'}).sort({ _id: 1 }).limit(5)
  })
  .then(rs => {
    if (rs) atc._comments = rs
    res.send({ success: true, d: atc, token: req.token })
  })
  .catch(e => {
    res.send({ success: false, msg: e.message })
  })
})

router.all('*', require('../notFound'));

module.exports = router;
