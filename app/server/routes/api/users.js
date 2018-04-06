const express = require('express')
const router = express.Router()
const utils = require('../utils')
const User = require('../../models/user')

module.exports = function (passport) {

  router.get('/api/admin/users', (req, res) => {
    User.find({}, function (err, users) {
      if (err) {
        res.status(500).json({message: 'Error fetching list of users'})
      } else {
        res.json({users: users})
      }
    })
  })

  router.get('/api/admin/user/:sid', (req, res) => {
    User.findOne({sid: req.params.sid}, function (err, user) {
      if (err) {
        res.status(500).json({message: 'Error fetching user'})
      } else {
        if (user) {
          res.json({user: user})
        } else {
          res.status(500).json({message: 'No user found with that id'})
        }
      }
    })
  })

  router.patch('/api/admin/user/:sid/reset', (req, res) => {
    User.findOne({sid: req.params.sid}, function (err, user) {
        if (err) {
          res.status(500).json({message: 'Error fetching user'})
        } else {
          if (user) {
            utils.resetUserPassword(user, req.body.password, function (err, user) {
              if (err) {
                res.status(500).json({message: err.message})
              } else {
                res.json({user: user})
              }
            })
          } else {
            res.status(500).json({message: 'No user found with that id'})
          }
        }
      }
    )
  })

  router.patch('/api/admin/user/:sid', (req, res) => {
    User.findOneAndUpdate({sid: req.params.sid}, req.body, {new: true}, function (err, user) {
        if (err) {
          res.status(500).json({message: 'Error fetching user'})
        } else {
          if (user) {
            res.json({user: user})
          } else {
            res.status(500).json({message: 'No user found with that id'})
          }
        }
      }
    )
  })

  router.post('/api/admin/users', (req, res) => {
    User.findOne({username: req.body.username}, function (err, user) {
      if (err) {
        res.status(500).json({message: 'An unexpected error occurred while creating new user'})
      } else {
        if (user) {
          res.status(500).json({message: 'A user with this username already exists'})
        } else {
          utils.createUser(req.body.name, req.body.email, req.body.password, req.body.username,
            req.body.maths, req.body.physics, req.body.chemistry, req.body.biology, function (err, user) {
              if (err) {
                res.status(500).json({message: 'An unexpected error occurred while creating new user'})
              } else {
                if (user) {
                  res.json({message: 'User Created'})
                } else {
                  res.status(500).json({message: 'An unexpected error occurred while creating new user'})
                }
              }
            })
        }
      }
    })
  })
  return router
}
