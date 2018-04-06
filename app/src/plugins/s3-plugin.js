var S3Plugin = {
  install: function (Vue, options) {
    Vue.s3Init = function (callback) {
      try {
        AWS.config.update({
          region: process.env.AWS_REGION,
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        })

        Vue.s3 = new AWS.S3({
          params: {Bucket: process.env.AWS_BUCKET}
        })
      } catch (e) {
        if (e instanceof ReferenceError) {
          console.log('AWS is not loaded!!')
          callback(new Error('AWS is not loaded!!'), null)
        } else {
          callback(e, null)
        }
      }
    }

    Vue.uploadPhoto = function (photoFile, photoFileName, callback) {
      if (Vue.s3 === undefined) {
        Vue.s3Init()
      }

      Vue.s3.upload({
        Key: photoFileName,
        Body: photoFile
      }, function (err, data) {
        callback(err, data)
      })
    }
  }
}

export default S3Plugin
