const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const connectMongo = require('connect-mongo')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config()
const app = express()

// 'mongodb://localhost/blog_tut' -- local database
// Connect to mongodb database
mongoose.connect('mongodb+srv://shaikabrar:shaikabrar@cluster0.ujfwf.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to database successfully')
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: connectMongo.create({ mongoUrl: 'mongodb+srv://shaikabrar:shaikabrar@cluster0.ujfwf.mongodb.net/?retryWrites=true&w=majority' })
  }));


app.use(express.Router())
// middlewares






app.set('view engine','ejs')
// routes
app.use(require('./routes/index'))
app.use(require('./routes/compose'))
app.use(require('./routes/blog'))
app.use(require('./routes/auth'))

// server configurations are here...
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server listening at port ${port}`)
})

