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
	let newUser = req.body
	console.log(newUser)
	db.User.update({"_id":newUser._id},{$set:{username: newUser.username, password: newUser.password}})
	.then(() => {
		res.status(200)
		db.User.find()
		.then(result => { console.log(result)})
	})
	.catch((err) => {console.log(err)})
})


module.exports = router