const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router()
const User = require('../models/User')
const session = require('express-session')


router.get('/register', (req, res) => {
    var exists = req.session.exists
    res.render('signup', {exists: exists})
})
router.post('/register', async (req, res) => {
    const username = req.body.username
    const password = await bcrypt.hash(req.body.password,10)
    const email = req.body.email
    var does_exist = false
    const findUser = await User.findOne({username: username})
    if(findUser) {
        req.session.exists = true
        does_exist= true
    }
    if(does_exist) {
        res.redirect('/register')
    } else {
        const newUser = new User({username, password, email})
        newUser.save()
        .then(() => {
            console.log('User registered succesfully')
            res.redirect('/login')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    })
    




router.get('/login', (req, res) => {
    var incorrect = req.session.incorrect
    res.render('login', {incorrect: incorrect})
})

router.post('/login', (req, res) => {
    const {username, password} = req.body
    User.findOne({username}, (error, user) => {
        if(user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) {
                    req.session.user_name = req.body.username
                    req.session.userId = user._id
                    console.log('Username: ' + req.session.user_name)
                    console.log('User id: '+ req.session.userId)
                    res.redirect('/home')
                } else {
                    req.session.incorrect = true
                    res.redirect('/login')
                }
            })
        } else {
            res.redirect('/login')
        }
    })
})

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                console.log(err)
            } else {
                res.redirect('/login')
            }
        })
    } else {
        res.redirect('/login')
    }
    
})

// router.get('/compose', (req, res) => {
//     console.log(req.session.user_name)
//     if(req.session.user_name) {
//         res.render('composeBlog', {username: req.session.user_name})
//     } else {
//         res.redirect('/login')
//     }
// })

module.exports = router