'use strict'
const express = require('express')     
const router = express.Router()
const db = require('../db/db.js')

router.post('/api/admin/remove',function(req,res){
	
	var aid = req.body.aid
	db.Article.remove({"_id": aid})
	.then(() =>{res.sendStatus(200)})
})

router.post('/api/admin/addArticle',function(req,res){
	new db.Article(req.body).save()
	.then((err) =>{res.sendStatus(200)})
})

router.post('/api/admin/alter',function(req,res){
	let article = req.body,
		_id = article._id,
		newValue = {
			tags:article.tags,
			title:article.title,
			content:article.content
		};
	db.Article.update({_id: _id},{$set:newValue})
	.then(() => {
		res.status(200).send();
	})
})


router.post('/api/admin/articleToDraft',function(req,res) {
	var _id = req.body._id;
    delete req.body._id;
    Promise.all([db.Article.remove({_id:_id}),new db.Draft(req.body).save()])
     .then(() => res.status(200).send())

})

module.exports = router