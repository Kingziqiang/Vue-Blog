const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
let { username, password } = require('../config');
/* 创建并连接数据库 */
const db= mongoose.createConnection('127.0.0.1','my-blog-cms');


/* 定义文章Schma */
const ArticleSchema = new Schema({
	title:String,
	date:Date,
	content:String,
	tags:[String]
})

const CommentSchema = new Schema({
	aid: String,
	email: String,
	name: String,
	content: String,
	date: Date,
	agree: Number,
	isManager: Boolean
})

/*定义用户Schma*/
const UserSchema = new Schema({
	username:String,
	password:{type: String,unique:true}
})

/*定义草稿Schma*/
const DraftSchema = new Schema({
	title:String,
	tags:[String],
	date:Date,
	content:String
})



/* 将Schma发布为Model */
const Models = {
	Article: db.model('Article', ArticleSchema),
	User: db.model('User', UserSchema),
	Draft: db.model('Draft', DraftSchema),
	Comment: db.model('Comment', CommentSchema)
}


/* 初始化数据将数据插入数据库 */
const initialize = () => {
  var promise = new Promise(function (resolve,reject) {
	Models.User.findOne({}).then(user => {
	  if(user) resolve();
	  else {
		// password加密
		const salt = bcrypt.genSaltSync(10);
		password = bcrypt.hashSync(password, salt);
		new Models.User({username, password}).save();
		resolve();
	  }
	})		
  });
  promise
  .then(() => {console.log('数据初始化插入成功啦~')})
  .catch(() => {console.log('数据初始化插入失败~')})
}

db.on('error',console.error.bind(console,"数据库连接错误~"))
db.once('open',initialize);

module.exports = Models;
