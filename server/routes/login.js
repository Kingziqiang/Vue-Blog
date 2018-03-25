'use strict'
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const db = require('../db/db.js');
const jwt = require('jsonwebtoken');

router.get('/api/login',function(req, res){
  let {username, password} = req.query.payload;
  db.User.findOne({username})
	.then((user) => {		
	  if(bcrypt.compareSync( password, user.password)) {
		  // 生成sessionId返回给客户端
			let exp = Math.floor((new Date().getTime())/1000) + 60 * 60 * 24 * 30,
				expire = (new Date()).getTime() + 1000 * 60 * 20,
		    session = jwt.sign({ expire, exp }, 'HILDA_BLOG');
		  res.cookie('session', session);
		  res.send(user.username);
	  } else {
		  res.sendStatus(403)
	  }
	})
})

router.post('/api/admin/alterUser', function (req, res) {  
  let {username, password} = req.body;
  let salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);
  db.User.update({}, {$set: {username, password}})
    .then(() => {
		res.status(200).send({username});
	})
})

module.exports = router;