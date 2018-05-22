const express = require('express')
const router = express.Router()
const Paper = require('../../models/paper')
const utils = require('../utils')
module.exports = function (passport) {
  router.get('/api/admin/papers', (req, res) => {
    Paper.find({}, function (err, papers) {
      if (err) {
        res.status(500).json({message: 'Error fetching list of papers'})
      } else {
        res.json({papers: papers})
      }
    })
  })

  router.get('/api/admin/papers/count', (req, res) => {
    var cur = Paper.aggregate([{$match: {active: true}}, {
      $group: {
        _id: '$subject',
        total: {'$sum': 1}
      }
    }]).cursor({batchSize: 1000}).exec();

    var retArr = {}

    cur.each(function (err, results) {
      if (results != null) {
        retArr[results._id] = results.total
      } else {
        res.json({count: retArr})
      }
    });


  })

  router.get('/api/admin/papers/:subject', (req, res) => {
    Paper.find({subject: req.params.subject}, function (err, papers) {
      if (err) {
        res.status(500).json({message: 'Error fetching list of papers'})
      } else {
        res.json({papers: papers})
      }
    })
  })

  router.get('/api/admin/paper/:sid', (req, res) => {
    Paper.findOne({sid: req.params.sid}, function (err, paper) {
      if (err) {
        res.status(500).json({message: 'Error getting paper'})
      } else {
        if (paper) {
          res.json({paper: paper})
        } else {
          res.status(500).json({message: 'Paper not found'})
        }
      }
    })
  })

  router.patch('/api/admin/paper/:sid', (req, res) => {
    Paper.findOneAndUpdate({sid: req.params.sid}, req.body, {new: true}, function (err, paper) {
      if (err) {
        res.status(500).json({message: 'Error getting paper'})
      } else {
        if (paper) {
          res.json({paper: paper})
        } else {
          res.status(500).json({message: 'Paper not found'})
        }
      }
    })
  })

  router.post('/api/admin/papers', (req, res) => {
    Paper.find({key: req.body.key}, function (err, papers) {
      if (err) {
        res.status(500).json({message: err.message})
      } else {
        if (papers.length > 0) {
          res.status(500).json({message: 'A paper with this file name already exists'})
        } else {
          utils.createPaper(req.body.name, req.body.key, req.body.subject, req.body.description, req.body.type, req.body.topic, function (err, paper) {
            if (err) {
              res.status(500).json({message: err.message})
            } else {
              res.json({message: 'File Uploaded successfully'})
            }
          })
        }
      }
    })
  })

  return router
}
