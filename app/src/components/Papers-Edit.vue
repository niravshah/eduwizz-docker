<template>
  <div>
    <h3><i class="fa fa-angle-right"></i> Edit Paper</h3>
    <div v-if="paper != ''" class="row mt">
      <div class="col-lg-12">
        <div class="form-panel">
          <form class="form-horizontal style-form" novalidate>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Name</label>
              <div class="col-sm-6">
                <input name="name" v-model="paper.name" type="text" class="form-control">
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Description</label>
              <div class="col-sm-6">
                <input name="description" v-model="paper.description" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Subject</label>
              <div class="col-sm-6">
                <label class="checkbox-inline">
                  <input type="radio" id="maths" name="subject" v-model="paper.subject" value="maths"> Maths
                </label>
                <label class="checkbox-inline">
                  <input type="radio" id="physics" name="subject" v-model="paper.subject" value="physics"> Physics
                </label>
                <label class="checkbox-inline">
                  <input type="radio" id="chemistry" name="subject" v-model="paper.subject" value="chemistry"> Chemistry
                </label>
                <label class="checkbox-inline">
                  <input type="radio" id="biology" name="subject" v-model="paper.subject" value="biology"> Biology
                </label>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Topic</label>
              <div class="col-sm-6">
                <input name="topic" v-model="paper.topic" type="text" class="form-control">
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">No. of Questions</label>
              <div class="col-sm-6">
                <input name="questions" v-model="paper.questions" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Time Allowed (mins)</label>
              <div class="col-sm-6">
                <input name="time" v-model="paper.time" type="text" class="form-control">
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <button id="saveBtn" v-on:click.prevent="submit()" class="btn btn-theme">Save
                </button>
                <span id="processingSpinner"></span>
                <span id="saveError"></span>
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
    name: 'Papers-Edit',
    data: function () {
      return {
        paper: ''
      }
    },
    created: function () {
      var url = '/api/admin/paper/' + this.$route.query.sid
      axios.get(url).then(res => {
        this.paper = res.data.paper
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      submit: function () {
        var url = '/api/admin/paper/' + this.$route.query.sid
        // eslint-disable-next-line no-undef
        var spinner = new Spinner({scale: 0.75}).spin()
        document.getElementById('processingSpinner').style.display = 'block'
        document.getElementById('processingSpinner').appendChild(spinner.el)
        document.getElementById('saveBtn').disabled = true

        axios.patch(url, this.paper).then(res => {
          if (res.status === 200) {
            this.$router.push('/admin/papers')
          } else {
            this.stopSpinner(spinner)
          }
        }).catch(err => {
          this.stopSpinner(spinner)
          document.getElementById('saveError').innerText = err.message
        })
      },
      stopSpinner: function (spinner) {
        spinner.stop()
        document.getElementById('processingSpinner').style.display = 'none'
        document.getElementById('saveBtn').disabled = false
      }
    }
  }
</script>
<style></style>
