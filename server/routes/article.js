const express = require('express')
const router = express.Router()
const db = require('../db/db.js')


//查询部分文章
router.get('/api/articles',function(req,res){
	var tag = req.query.payload.tag
	var limit = +req.query.payload.limit;
    var skip = +req.query.payload.skip
    console.log(limit)
    if (tag && tag !== '全部') {
        db.Article
        .find({tags: tag})
        .sort()
        .skip(skip)
        .limit(limit)
        .then((articles) => {
        	console.log(articles)
                res.send(articles)
        })
    } else {
       db.Article
        .find()
        .sort({date: -1})
        .limit(limit)
        .skip(skip)
        .then((articles) => {
        	console.log(articles)
                res.send(articles)
        })
    }
})

//查询所有tag
router.get('/api/tags',function(req,res){
	db.Article.distinct("tags",{}).then(tags => {
		res.status(200).send(tags);
	})
})

router.get('/api/article',function(req,res){
	let aid = req.query.payload.aid
	db.Article.findOne({_id:aid}).then(article => {
		res.status(200).send(article)
		console.log(article)
	})
})


module.exports = router