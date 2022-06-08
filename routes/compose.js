const express = require('express');
const router = express.Router()
const Blog = require('../models/Blog')

router.get('/compose', (req, res) => {
    // if(req.sessions.userId) {
    //     res.render('composeBlog')
    // } else {
    //     res.redirect('/login')
    // }
    var is_authenticated = false
    if(req.session.userId) {
        is_authenticated = true
    }
    if(req.session.userId) {
        console.log('In compose route: Username: ' + req.session.user_name)
        console.log('User id: '+ req.session.userId)
        res.render('composeBlog', {is_authenticated: is_authenticated})
    } else {
        res.redirect('/login')   
    }
    
})

router.post('/compose', (req, res) => {
    const {title, content} = req.body
    
    // Check missing fields
    if(!title || !content) return res.send('Please enter all the required fields')
    const userId = req.session.userId
    const username = req.session.user_name
    const newBlog = new Blog({title, content, userId, username})

    // save the blog to the database
    newBlog.save()
    .then(() => {
        console.log('Blog saved successfully by user: ' + req.session.user_name)
        console.log('Blog saved successfully by userId: ' + userId)
        res.redirect('/home')
    })
    .catch((err) => {
        console.log(err)
    })
    
})


module.exports = router

