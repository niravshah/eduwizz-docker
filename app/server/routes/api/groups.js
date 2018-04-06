const express = require('express')
const router = express.Router()
const Group = require('../../models/group')
const utils = require('../utils')
module.exports = function (passport) {
  router.get('/api/admin/groups', (req, res) => {
    Group.find({}, function (err, groups) {
      if (err) {
        res.status(500).json({message: 'Error fetching list of groups'})
      } else {
        res.json({groups: groups})
      }
    })
  })
  router.get('/api/admin/group/:sid', (req, res) => {
    Group.findOne({sid: req.params.sid}, function (err, group) {
      if (err) {
        res.status(500).json({message: 'Error getting group'})
      } else {
        if (group) {
          res.json({group: group})
        } else {
          res.status(500).json({message: 'Group not found'})
        }
      }
    })
  })
  router.patch('/api/admin/group/:sid', (req, res) => {
    Group.findOneAndUpdate({sid: req.params.sid}, req.body, {new: true}, function (err, group) {
      if (err) {
        res.status(500).json({message: 'Error getting group'})
      } else {
        if (group) {
          res.json({group: group})
        } else {
          res.status(500).json({message: 'Group not found'})
        }
      }
    })
  })
  router.post('/api/admin/groups', (req, res) => {
    Group.findOne({name: req.body.name}, function (err, user) {
      if (err) {
        res.status(500).json({message: 'An unexpected error occurred while creating new group'})
      } else {
        if (user) {
          res.status(500).json({message: 'A group with this name already exists'})
        } else {
          utils.createGroup(req.body.name, req.body.description, req.body.contactEmail, req.body.contactPhone, function (err, group) {
            if (err) {
              res.status(500).json({message: 'An unexpected error occurred while creating new group'})
            } else {
              if (group) {
                res.json({message: 'Group Created'})
              } else {
                res.status(500).json({message: 'An unexpected error occurred while creating new group'})
              }
            }
          })
        }
      }
    })
  })

  return router
}
