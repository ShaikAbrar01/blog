const express = require('express');
const router = express.Router()
const Blog = require('../models/Blog')
const Comment = require('../models/Comment')

router.post('/comment/:id', (req,res) => {
    console.log('Got a request for comment')
    const {id} = req.params
    const blogId = id.toString()
    const {comment} = req.body
    const username = req.session.user_name

    const newComment = new Comment({comment,username,blogId})
    newComment.save()
    .then(() => {
        console.log('Comment saved')
        res.redirect('/blog/'+id)
    })
    .catch((err) => {
        console.log(err)
    })
})

module.exports = router