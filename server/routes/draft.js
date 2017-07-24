const express = require('express')
const router = express.Router()
const db = require('../db/db.js')

 

  router.patch('/api/draft',function (req,res){
  let _id = req.body._id;
  delete req.body._id;
  db.Draft.update({_id: _id},{$set: req.body})
  .then(() => {console.log("修改成功")})
  .catch(err => console.log(err) )

  })

  router.post('/api/postDraft',function(req,res){
    var _id = req.body._id;
    console.log(req.body)
    delete req.body._id;
    Promise.all([db.Draft.remove({_id:_id}),new db.Article(req.body).save()])
     .then(() => res.status(200).send())
     .catch(err => console.log(err))

  })

  router.get('/api/draft',function(req,res){
    let aid = req.query.payload.aid
    db.Draft.findOne({_id:aid}).then(draft => {
      res.status(200).send(draft)
      console.log(draft)
    })
  })

  router.delete('/api/draft/:_id',(req, res) => {
    db.Draft.remove({_id: req.params._id}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send('succeed in deleting ---' + data);
            console.log("草稿删除成功了")      
        }
    })
  })
  router.get('/api/getDrafts',function (req,res){
    let limit = +req.query.payload.limit,
        skip = +req.query.payload.skip;
        console.log(limit,skip)
    db.Draft
    .find()
    .limit(limit)
    .skip(skip)
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((err) => {
      console.log(err)
    })
  }),

  router.post('/api/saveDraft',function (req,res){
    new db.Draft(req.body).save()
    .catch((err) => {
      console.log(err)
    })
  }),
  


module.exports = router