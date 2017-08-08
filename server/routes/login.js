const express = require('express')
const router = express.Router()
const db = require('../db/db.js')

router.get('/api/login',function(req,res){
	let username = req.query.payload.username
	let password = req.query.payload.password

	db.User.findOne({"username":username,"password":password})
	.then((user) => {
		res.status(200).send(user)
	})
	.catch( (err) => {console.log(err)} )
})

router.post('/api/alterUser',function(req,res){
	db.User.remove({}).then(() => {
		new db.User(req.body).save()
		.then(() =>{res.sendStatus(200); console.log(req.body)})
		.catch(() => {console.log(err)})
	})
})


module.exports = router