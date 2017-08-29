'use strict'
const express = require('express')
const app = express()
const article = require('./article.js')
const login = require('./login.js')
const admin = require('./admin')
const draft = require('./draft')
const comment = require('./comment')

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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