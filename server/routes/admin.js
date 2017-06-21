const express = require('express')
const router = express.Router()
const db = require('../db/db.js')

router.post('/api/remove',function(req,res){
	
	var aid = req.body.aid
	db.Article.remove({"_id": aid})
	.then(() =>{res.sendStatus(200)})
	.catch(() => {console.log(err)})
})

router.post('/api/addArticle',function(req,res){
	new db.Article(req.body).save()
	.then(() =>{res.sendStatus(200)})
	.catch(() => {console.log(err)})
})

router.post('/api/alter',function(req,res){
	let article = req.body,
		_id = article._id,
		newValue = {
			tags:article.tags,
			title:article.title,
			content:article.content
		};
	db.Article.update({_id: _id},{$set:newValue})
	.then((result) => {
		console.log(result);
		db.Article.findOne({_id: _id}).then((result) => {
			console.error("更新后数据"+result)
		})
	})
	.catch((err) => {console.err("修改失败"+err)})
})


module.exports = router