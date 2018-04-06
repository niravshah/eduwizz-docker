<template>
  <div>
    <h3><i class="fa fa-angle-right"></i> Add a New Paper</h3>
    <div class="row mt">
      <div class="col-lg-12">
        <div class="form-panel">
          <form class="form-horizontal style-form" novalidate>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Name</label>
              <div class="col-sm-6">
                <input name="name" v-model="name" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Description</label>
              <div class="col-sm-6">
                <input name="description" v-model="description" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Subject</label>
              <div class="col-sm-6">
                <label class="checkbox-inline">
                  <input type="radio" id="maths" name="subject" v-model="subject" value="maths"> Maths
                </label>
                <label class="checkbox-inline">
                  <input type="radio" id="physics" name="subject" v-model="subject" value="physics"> Physics
                </label>
                <label class="checkbox-inline">
                  <input type="radio" id="chemistry" name="subject" v-model="subject" value="chemistry"> Chemistry
                </label>
                <label class="checkbox-inline">
                  <input type="radio" id="biology" name="subject" v-model="subject" value="biology"> Biology
                </label>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Topic</label>
              <div class="col-sm-6">
                <input name="topic" v-model="topic" type="text" class="form-control">
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Upload File</label>
              <div class="col-sm-6">
                <input v-on:change="getSignedUrl()" type="file" name="paperFile" id="paperFile">
                <span id="paperFileSpinner"></span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">No. of Questions</label>
              <div class="col-sm-6">
                <input name="questions" v-model="questions" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Time Allowed (mins)</label>
              <div class="col-sm-6">
                <input name="time" v-model="time" type="text" class="form-control">
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button v-bind:disabled="!isValid" v-on:click.prevent="submit()" class="btn btn-theme">Save
                </button>
                <span id="saveSpinner"></span>
                <span id="paperUploadError"></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'AddPaper',
    data: function () {
      return {
        name: '',
        description: '',
        subject: '',
        questions: '',
        time: '',
        signedUrl: '',
        topic: ''
      }
    },
    computed: {
      isValid: function () {
        return !this.errors.any() &&
          this.name !== '' &&
          this.subject !== '' &&
          this.signedUrl !== ''
      }
    },
    methods: {
      submit: function () {
        const files = document.getElementById('paperFile').files
        const file = files[0]
        let data = new FormData()
        data.append('file', file)
        // eslint-disable-next-line no-undef
        var spinner = new Spinner({scale: 0.75}).spin()
        document.getElementById('saveSpinner').appendChild(spinner.el)
        axios.put(this.signedUrl, data).then(res => {
            // eslint-disable-next-line indent
            if (res.status === 200) {
              var url = '/api/admin/papers'
              var body = {
                name: this.name,
                subject: this.subject,
                description: this.description,
                key: file.name,
                type: file.type,
                questions: this.questions,
                time: this.time,
                topic: this.topic
              }
              axios.post(url, body).then(res => {
                if (res.status === 200) {
                  this.$router.push('/admin/papers')
                } else {
                  spinner.stop()
                  document.getElementById('paperUploadError').innerHTML = '<p>' + res.data.message + '</p>'
                }
              }).catch(err => {
                console.log('Error', err)
                spinner.stop()
                document.getElementById('paperUploadError').innerHTML = '<p>Error Uploading File</p>'
              })
            } else {
              spinner.stop()
              document.getElementById('paperUploadError').innerHTML = '<p>Error Uploading File</p>'
            }
            // eslint-disable-next-line indent
          }
        ).catch(err => {
          console.log(err)
          spinner.stop()
          document.getElementById('paperUploadError').textContent('Error Uploading File')
        })
      },
      getSignedUrl: function () {
        const files = document.getElementById('paperFile').files
        const file = files[0]
        const url = '/api/aws/sign/put?name=' + file.name + '&type=' + file.type
        // eslint-disable-next-line no-undef
        var spinner = new Spinner({scale: 0.5}).spin()
        document.getElementById('paperFileSpinner').appendChild(spinner.el)
        axios.get(url).then(res => {
          this.signedUrl = res.data.signedData
          spinner.stop()
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style></style>
