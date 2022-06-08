const express = require('express');
const router = express.Router()
const Blog = require('../models/Blog')
router.get('/blog/:id', async (req, res) => {
    var is_authenticated = false
    if(req.session.userId) {
        is_authenticated = true
    }

    const {id} = req.params
    const getBlog = await Blog.findOne({_id: id})
    const username = getBlog.username
    const getBlogs = await Blog.find({username})

    res.render('particularBlog', {blog: getBlog, is_authenticated: is_authenticated, blogs: getBlogs})
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
    const {title, content} = req.body
    Blog.updateOne({_id: id}, {title, content})
    .then(() => {
        console.log('Successfully updated the blog')
        res.redirect('/blogs')
    })
    .catch((err) => {
        console.log(err)
    })
})

module.exports = router