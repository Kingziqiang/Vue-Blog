const express = require('express')
const router = express.Router()
const db = require('../db/db.js')
const email = require('../email')

const NOTICE_ADDRESS = '1770147149@qq.com'

// 获取该文章所有评论
router.get('/api/comment/:aid',(req, res) => {
	const aid = req.params.aid;
	db.Comment.find({aid: aid},function (err, comments){
		if(err) 
			console.log(err);
		else
			res.status(200).send(comments);
	})
	
})

// 保存邮件并发送评论
router.put('/api/comment',(req, res) => {	
	let comment = Object.assign(req.body,{agree: 0, date: new Date()})
	new db.Comment(comment).save()
	.then(() => {
		if(/^@.+:/.test(comment.content)){  //回复评论 给被回复者和站长发送邮件
			let replyTo = comment.content.match(/^@(.+)(?=:)/)[1]
			console.log("to:",replyTo)
			db.Comment.findOne({name: replyTo},(err,result) => {
				if(!comment.isManager){
					email.sendMail(NOTICE_ADDRESS,'您的博客文章有新评论了噢', comment.content);
				}
				console.log(result)								
				email.sendMail(result.email, "您的评论有新回复了噢~", comment.content);
			})			
		}
		else{  // 评论 给站长发送邮件
			email.sendMail(NOTICE_ADDRESS,'您的博客文章有新评论', comment.content);
		}
		res.status(200).end()
	})
	.catch(err => {console.log(err)})
})

// 更新评论点赞数
router.post('/api/agree',(req, res) => {  
	const payload = req.body;
	db.Comment.update({_id: payload._id}, {$set: payload})
	.catch(err => {console.log(err)})
	
})
module.exports = router;