const express = require('express');
const router = express.Router()
const Blog = require('../models/Blog')
const Comment = require('../models/Comment')
router.get('/blog/:id', async (req, res) => {
    var is_authenticated = false
    if(req.session.userId) {
        is_authenticated = true
    }

    const {id} = req.params
    const getBlog = await Blog.findOne({_id: id})
    const username = getBlog.username
    const getBlogs = await Blog.find({username})
    const getComments = await Comment.find({blogId: id})
    console.log('comments: ' + getComments)

    res.render('particularBlog', {blog: getBlog, is_authenticated: is_authenticated, blogs: getBlogs, comments: getComments})
})

router.get('/delete/:id', (req, res) => {
    const {id} = req.params
    Blog.deleteOne({_id: id})
    .then(() => {
        console.log('Blog deleted successfully')
        res.redirect('/blogs')
    })
    .catch((err) => {
        console.log(err)
    })

})
router.get('/edit/:id',async (req, res) => {
    var is_authenticated = false
    if(req.session.userId) {
        is_authenticated = true
    }
    const {id} = req.params

    const getData = await Blog.findOne({_id: id})
    res.render("editBlog", {blog: getData, is_authenticated: is_authenticated})
})
router.post('/edit/:id', (req, res) => {
    const {id} = req.params
    const {title, content, image} = req.body
    if(image === '') {
        Blog.updateOne({_id: id}, {title, content})
        .then(() => {
            console.log('Successfully updated the blog')
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
    } else {
        Blog.updateOne({_id: id}, {title, content, image})
        .then(() => {
            console.log('Successfully updated the blog')
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
})

// router.post('/comment/:id', (req,res) => {
//     const id = req.params
//     const {comment} = req.body
//     Blog.updateOne({_id:id}, {$push:{comments: comment}})
//     .then(() => {
//         console.log('Added a comment')
//         res.redirect(`/blog/${id}`)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

module.exports = router