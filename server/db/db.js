const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data');

/* 创建并连接数据库 */
const db= mongoose.createConnection('127.0.0.1','my-blog-cms');


/* 定义文章Schme */
const ArticleSchema = new Schema({
	title:String,
	date:Date,
	content:String,
	tags:[String]
})

/*定义用户Schme*/
const UserSchme = new Schema({
	username:String,
	password:{type: String,unique:true}
})




/* 将Schme发布为Model */
const Models = {
	Article:db.model('Article',ArticleSchema),
	User:db.model('User',UserSchme)
}


/* 初始化数据将数据插入数据库 */
const initialize = () => {
	var promise = new Promise(function (resolve,reject) {
		data.map((item) => {
			new Models.Article(item).save();
		});
		new Models.User({"username":"hilda","password":"123456"}).save();
		resolve();
	});
	promise
	.then(() => {console.log('数据初始化插入成功啦~')})
	.catch(() => {console.log('数据初始化插入失败咯~')})
	
}

db.on('error',console.error.bind(console,"数据库连接错误~"))
db.once('open',initialize);

module.exports = Models;
