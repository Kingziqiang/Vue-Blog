'use strict'
const express = require('express');
const app = express();

const article = require('./article.js');
const login = require('./login.js');
const admin = require('./admin');
const draft = require('./draft');
const comment = require('./comment');
const { SIGN_KEY } = require('../config');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.all('/api/admin/*', function(req, res, next) {
  console.log('收到')
  if(req.cookies.session) {
    try{
      let session = jwt.verify(req.cookies.session, SIGN_KEY);
      if(session.expire > (new Date()).getTime()){
        let exp = Math.floor((new Date().getTime()) / 1000) + 60 * 60 * 24 * 30,
				expire = (new Date()).getTime() + 1000 * 60 * 20;
        session = jwt.sign({ expire, exp }, 'HILDA_BLOG');
        console.log('新session', session);
        res.cookie('session', session);
        next();
      }
      else {
        res.status(403).send('session已过期，请重新登录');
      }
    } catch(err) {
      res.status(403).send('权限不足');
    }
  }
  else {res.status(403).send('未登录');}
});

app.use(article)
app.use(login)
app.use(admin)
app.use(draft)
app.use(comment)


//启动服务
var server = app.listen(3002, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('正在监听3002端口');
});