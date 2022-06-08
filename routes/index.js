const express = require('express');
const router = express.Router()
const Blog = require('../models/Blog')


router.get('/', (req, res) => {
    res.redirect('/home')
})
router.get('/home', async (req, res) => {
    var is_authenticated = false
    if(req.session.userId) {
        is_authenticated = true
    }
    const username = req.session.user_name
    const userId = req.session.userId
    console.log('In home route: '+req.session.user_name)
    console.log('User id: '+ req.session.userId)
    const allBlogs = await Blog.find()
    res.render('index', {blogs: allBlogs, is_authenticated: is_authenticated, username: username} )
})

router.get('/blogs', async (req, res) => {
    var is_authenticated = false
    if(req.session.userId) {
        is_authenticated = true
    }
    const userId = req.session.userId
    // console.log('User id in /blogs: ' + userId)
    const allUserBlogs = await Blog.find({userId})
    // console.log(allUserBlogs)
    res.render('userBlogs', {blogs: allUserBlogs, is_authenticated: is_authenticated})
})


module.exports = router