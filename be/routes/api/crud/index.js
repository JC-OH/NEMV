const express = require('express');
const createError = require('http-errors');
const router = express.Router();

const user = [
  {
    name: "Steve",
    age: 14
  },
  {
    name: "David",
    age: 24
  }
];

//----------------------------------------------------------------------------------------
// Request
//----------------------------------------------------------------------------------------
// req.app
// req.baseUrl
// [*]req.body
// req.cookies
// req.fresh
// req.hostname
// req.ip
// req.ips
// req.method
// req.originalUrl
// [*]req.params
// req.path
// req.protocol
// [*]req.query
// req.route
// req.secure
// req.signedCookies
// req.stale
// req.subdomains
// req.xhr

//----------------------------------------------------------------------------------------
// Response
//----------------------------------------------------------------------------------------
// res.append()
// res.attachment()
// res.cookie()
// res.clearCookie()
// res.download()
// res.end()
// res.format()
// res.get()
// res.json()
// res.jsonp()
// res.links()
// res.location()
// res.redirect()
// res.render()
// [*]res.send() : Send a response of various types. 다양한 유형의 응답을 보냅니다.
  // res.send(new Buffer('whoop'));
  // res.send({ some: 'json' });
  // res.send('<p>some html</p>');
  // res.status(404).send('Sorry, we cannot find that!');
  // res.status(500).send({ error: 'something blew up' });
// res.sendFile()
// res.sendStatus()
// res.set()
// res.status()
// res.type()
// res.vary()
//----------------------------------------------------------------------------------------
// Router
//----------------------------------------------------------------------------------------
// https://expressjs.com/en/4x/api.html#router

// A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.
// 라우터 객체는 미들웨어 및 라우트의 고립 된 인스턴스입니다.
// 미들웨어 및 라우팅 기능 만 수행 할 수있는 "미니 응용 프로그램"이라고 생각할 수 있습니다. 모든 Express 응용 프로그램에는 내장 된 응용 프로그램 라우터가 있습니다.
// A router behaves like middleware itself, so you can use it as an argument to app.use() or as the argument to another router’s use() method.
//  라우터는 미들웨어 자체처럼 동작하므로 app.use ()의 인수로 사용하거나 다른 라우터의 use () 메소드에 대한 인수로 사용할 수 있습니다.
// The top-level express object has a Router() method that creates a new router object.
// 최상위 익스프레스 오브젝트에는 새 라우터 오브젝트를 작성하는 Router () 메소드가 있습니다.
// Once you’ve created a router object, you can add middleware and HTTP method routes (such as get, put, post, and so on) to it just like an application.
// 라우터 객체를 만들면 애플리케이션과 마찬가지로 미들웨어 및 HTTP 메소드 경로 (get, put, post 등)를 추가 할 수 있습니다.
// router.all()
// router.METHOD()
// router.param()
// router.route()
// router.use()

// Read(또는 Retrieve)	읽기(또는 인출)	SELECT	GET
router.get('/', function(req, res, next) {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  res.send({success: true,  users: user , params: req.params, query: req.query, body: req.body});

});

// Create	생성	INSERT	POST
router.post('/', function(req, res, next) {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);

  res.send({ success: true, msg: 'post ok' , params: req.params, query: req.query, body: req.body });
});

// Update	갱신	UPDATE	PUT
router.put('/', function(req, res, next) {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  res.send({ success: true, msg: 'put ok' , params: req.params, query: req.query, body: req.body });
});

// Delete(또는 Destroy)	삭제(또는 파괴)	DELETE	DELETE
router.delete('/', function(req, res, next) {
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);

  res.send({ success: true, msg: 'del ok' , params: req.params, query: req.query, body: req.body });
});

// router.all('*', function(req, res, next) {
//   next(createError(404, '그런 api 없어'));
// });

router.all('*', require('../notFound'));

module.exports = router;
