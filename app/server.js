var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var http = require('http')

var app = express()

require('dotenv').config()

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URL, {useMongoClient: true})

app.set('views', path.join(__dirname, './server/views'))
app.set('view engine', 'ejs')

var passport = require('passport')
app.use(passport.initialize())

var initPassport = require('./server/passport/init')
initPassport(passport)

var login = require('./server/routes/api/auth')(passport)
var aws = require('./server/routes/api/aws')(passport)
var users = require('./server/routes/api/users')(passport)
var papers = require('./server/routes/api/papers')(passport)
var groups = require('./server/routes/api/groups')(passport)
var answerKeys = require('./server/routes/api/answerSheets')(passport)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(login)
app.use(aws)
app.use(users)
app.use(papers)
app.use(groups)
app.use(answerKeys)

app.use(express.static(path.join(__dirname, 'dist')))
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

var port = process.env.PORT || '8096'
app.set('port', port)

var server = http.createServer(app)
server.listen(port, function () {
  console.log('Eduwizz API running on localhost: ' + port)
})
