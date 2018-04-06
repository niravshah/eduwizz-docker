const User = require('../models/user')
const Paper = require('../models/paper')
const Group = require('../models/group')
const bcrypt = require('bcrypt')
const shortid = require('shortid')
const saltRounds = 10

module.exports = {
  createGroup: function (name, description, phone, email, callback) {
    const newGroup = new Group()
    newGroup.sid = shortid.generate()
    newGroup.name = name
    newGroup.description = description
    newGroup.contactPhone = phone
    newGroup.contactEmail = email
    newGroup.save(function (err, group) {
      callback(err, group)
    })
  },
  createUser: function (name, email, password, username, maths, physics, chemistry, biology, callback) {
    const newUser = new User()
    newUser.sid = shortid.generate()
    newUser.name = name
    newUser.email = email
    newUser.username = username
    newUser.password = bcrypt.hashSync(password, saltRounds)
    newUser.permissions.maths = maths
    newUser.permissions.physics = physics
    newUser.permissions.chemistry = chemistry
    newUser.permissions.biology = biology
    newUser.save(function (err, user) {
      callback(err, user)
    })
  },
  createPaper: function (name, key, subject, description, type, topic, cb) {
    const newPaper = new Paper()
    newPaper.sid = shortid.generate()
    newPaper.name = name
    newPaper.key = key
    newPaper.subject = subject
    newPaper.description = description
    newPaper.type = type
    newPaper.topic = topic
    newPaper.save(function (err, paper) {
      cb(err, paper)
    })
  },
  resetUserPassword: function (user, password, cb) {
    user.password = bcrypt.hashSync(password, saltRounds)
    user.save(function (err, user) {
      cb(err, user)
    })
  }
}
