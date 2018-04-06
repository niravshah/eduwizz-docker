<template>
  <div>
    <h3><i class="fa fa-angle-right"></i> Upload Answer Sheet</h3>
    <div class="row">
      <div class="col-md-12">
        <div v-if="pageErrors.length != 0" class="alert alert-danger" role="alert">
          <p v-for="e in pageErrors">{{e}}</p>
        </div>

      </div>
    </div>
    <div class="row mt">
      <div class="col-md-12">
        <h4>1. Enter Question Paper Id</h4>
        <input id="qid" name="qid" v-model="qid" type="text" autofocus>
      </div>
    </div>
    <div class="row mt">
      <div class="col-md-12">
        <h4>2. Select Answer Sheets</h4>
        <div v-bind:disabled="!isQidValid" class="btn btn-theme file-preview-input"><span
          class="glyphicon glyphicon-folder-open"></span> <span
          class="file-preview-input-title">Browse</span>
          <input type="file" name="input-file-preview"
                 v-on:change="getSignedUrl($event.target.files)"
                 multiple accept="image/*"/>
        </div>
      </div>
    </div>
    <div class="row mt">
      <div class="col-md-12">
        <h4>3. Preview</h4>
        <div id="previewPane"></div>
      </div>
    </div>
    <div class="row mt">
      <div class="col-md-12">
        <h4>4. Upload</h4>
        <div v-bind:disabled="!isOkToSend" class="btn btn-theme"
             style="width: 150px" data-toggle="modal" data-target="#myModal" data-backdrop="static"
             data-keyboard="false"><i
          class="fa fa-cloud-upload"></i> Upload
        </div>
        <span id="saveSpinner"></span>
      </div>
    </div>
    <!-- Upload Modal START-->
    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
            <h4 class="modal-title">Are you sure?</h4>
          </div>
          <div class="modal-body">
            <div v-if="uploadErrors.length != 0" class="alert alert-danger" role="alert">
              <p v-for="e in uploadErrors">{{e}}</p>
            </div>
            <div v-if="!uploading">
              <p>Total Files to send: {{files.length}}</p>
            </div>
            <transition name="fade">
              <div v-if="uploading">
                <div v-for="f in files" class="progress">
                  <div v-if="f.percent>0" class="progress-bar progress-bar-rb" role="progressbar"
                       v-bind:style="{ width: f.percent + '%' }">
                    {{f.percent}}% Complete ({{f.name}})
                  </div>
                </div>
              </div>
            </transition>
            <transition name="fade">
              <div v-if="completedUpload>=totalToUpload">
                <p>All Uploads Completed</p>
              </div>
            </transition>
          </div>
          <transition name="fade">
            <div class="modal-footer">
              <button type="button" class="btn btn-default" v-on:click="closeBtnClick()" data-dismiss="modal">Close
              </button>
              <div v-bind:disabled="uploading" v-on:click="sendAnswerSheets()" class="btn btn-theme"
                   style="width: 100px"><i
                class="fa fa-send"></i> Yes
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <!-- Upload Modal END-->
  </div>
</template>
<script>
  import axios from 'axios'
  import Vue from 'vue'

  export default {
    name: 'SubmitAnswers',
    data: function () {
      return {
        signedUrl: '',
        files: [],
        qid: '',
        sid: '',
        okToSend: true,
        pageErrors: [],
        uploadErrors: [],
        accentColor: '#FF4081',
        uploading: false,
        totalToUpload: 100,
        completedUpload: 0,
        loggedInUser: '',
        uploadedKeys: []
      }
    },
    computed: {
      isQidValid: function () {
        return this.qid !== ''
      },
      isOkToSend: function () {
        return this.okToSend && this.files.length !== 0
      }
    },
    created: function () {
      this.loggedInUser = JSON.parse(Vue.loggedInUser())
      this.sid = this.loggedInUser.sid
    },
    methods: {
      getSignedUrl: function (files) {
        var _this = this
        for (var i = 0; i < files.length; i++) {
          const file = files[i]
          const key = this.loggedInUser.sid + '_' + this.qid + '_s_' + this.files.length + '_' + file.name
          const url = '/api/aws/sign/put?name=' + key + '&type=' + file.type
          this.okToSend = false
          axios.get(url).then(res => {
            var reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function (e) {
              _this.processFile(e.target.result, file.type, res.data.signedData, file.name, key)
              var img = document.createElement('img')
              img.src = e.target.result
              var pane = document.getElementById('previewPane')
              pane.insertBefore(img, pane.childNodes[0])
            }
            this.okToSend = true
          }).catch(err => {
            _this.pageErrors.push('Error getting signed url from Eduwizz. Please contact administrator. ' + err.message)
          })
        }
      },
      processFile: function (dataURL, fileType, signedUrl, name, key) {
        var maxWidth = 800
        var maxHeight = 800
        var _this = this

        var image = new Image()
        image.src = dataURL

        image.onload = function () {
          // var _this = this
          var canvas, context, newWidth, newHeight
          var width = image.width
          var height = image.height
          var shouldResize = (width > maxWidth) || (height > maxHeight)
          if (!shouldResize) {
            canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            context = canvas.getContext('2d')
            context.drawImage(this, 0, 0, width, height)
          } else {
            if (width > height) {
              newHeight = height * (maxWidth / width)
              newWidth = maxWidth
            } else {
              newWidth = width * (maxHeight / height)
              newHeight = maxHeight
            }
            canvas = document.createElement('canvas')
            canvas.width = newWidth
            canvas.height = newHeight
            context = canvas.getContext('2d')
            context.drawImage(this, 0, 0, newWidth, newHeight)
          }

          if (canvas.toBlob) {
            canvas.toBlob(
              function (blob) {
                var dat = {}
                dat['name'] = name
                dat['key'] = key
                dat['file'] = blob
                dat['url'] = signedUrl
                dat['percent'] = 0
                _this.files.push(dat)
              },
              fileType
            )
          }
        }
        image.onerror = function () {
          _this.pageErrors.push('Error optimizing this image. Please contact administrator.')
        }
      },
      sendAnswerSheets: function () {
        var _this = this
        _this.uploading = true
        _this.totalToUpload = _this.files.length * 100
        _this.completedUpload = 0
        var totalFiles = _this.files.length
        for (var i = 0; i < this.files.length; i++) {
          let currentCounter = i
          var dat = this.files[i]
          let signedUrl = dat['url']
          let data = dat['file']
          let currentKey = dat['key']
          var config = {
            onUploadProgress: function (progressEvent) {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              _this.files[currentCounter]['percent'] = percentCompleted
              _this.completedUpload += percentCompleted
            }
          }
          // console.log(signedUrl, data)
          // axios.put('/api/aws/stub', [], config).then(resp => {
          axios.put(signedUrl, data, config).then(resp => {
            _this.uploadedKeys.push(currentKey)
            if (currentCounter === totalFiles - 1) {
              var keyUrl = '/api/keys/' + this.qid + '/' + this.sid
              axios.patch(keyUrl, {keys: _this.uploadedKeys, status: 'NEW'})
                .then(resp => {
                  // console.log('Key Update Response', resp)
                })
                .catch(err => {
                  _this.uploadErrors.push('Files uploaded to Amazon. But error updating Eduwizz. ' + err.message)
                })
            }
          }).catch(err => {
            _this.uploadErrors.push('Error uploading file to Amazon. ' + err.message)
          })
        }
      },
      closeBtnClick: function () {
        if (this.completedUpload >= this.totalToUpload) {
          this.$router.push('/')
        }
      }
    }
  }
</script>
<style lang="scss">

  $accent-color: #FF4081;

  #previewPane img {
    width: 200px;
    margin: 20px 20px;
  }

  #qid {
    width: 300px;
    height: 30pt;
    border-radius: 4px;
    font-size: 24px;
    text-align: center;
  }

  .file-preview-input {
    position: relative;
    overflow: hidden;
    margin: 0px;
    color: white;
    background-color: $accent-color;
    border-color: #ccc;
    width: 150px;
  }

  .file-preview-input input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
  }

  .file-preview-input-title {
    margin-left: 2px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 2s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0
  }

  .progress-bar-rb {
    background-color: #303F9F;
  }
</style>
