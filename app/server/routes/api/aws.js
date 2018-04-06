const express = require('express')
const Paper = require('../../models/paper')
const router = express.Router()

const AWS = require('aws-sdk')

const s3 = new AWS.S3({
  signatureVersion: process.env.AWS_SIGNATURE_VERSION,
  region: process.env.AWS_REGION
})

AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY})
const signedUrlExpireSeconds = 60 * 5

module.exports = function (passport) {
  router.get('/api/aws/sign/get', passport.authenticate('jwt', {
    failWithError: true
  }), function (req, res, next) {
    Paper.findOne({key: req.query.key}, function (err, paper) {
      if (err) {
        res.status(500).json({error: 'Unable to find a paper with the specified key'})
      } else {
        if (paper) {
          if (req.user.canView(paper)) {
            s3.getSignedUrl('getObject', {
              Bucket: process.env.AWS_BUCKET,
              Key: req.query.key,
              Expires: signedUrlExpireSeconds
            }, function (err, data) {
              if (err) {
                res.status(500).json({message: err.message})
              } else {
                res.json({url: data})
              }
            })
          } else {
            res.status(403).json({message: 'You do not permissions to download this paper'})
          }
        } else {
          res.status(500).json({message: 'Couldnt find the paper you are looking for!'})
        }
      }
    })
  }, function (err, req, res, next) {
    res.status(500).json({message: err.message})
  })

  router.get('/api/aws/sign/put', function (req, res) {
    const bucketName = process.env.AWS_BUCKET
    const url = 'https://' + bucketName + '.s3.amazonaws.com/' + req.query.name
    s3.getSignedUrl('putObject', {
      Bucket: process.env.AWS_BUCKET,
      Key: req.query.name,
      Expires: signedUrlExpireSeconds,
      ContentType: req.query.type
    }, function (err, data) {
      if (err) {
        console.log(err)
        res.status(500).json({err: err})
      } else {
        res.json({signedData: data, url: url})
      }
    })
  })

  router.put('/api/aws/stub', function (req, res) {
    res.json({message: 'ok'})
  })

  return router
}
