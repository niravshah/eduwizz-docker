<template>
  <div>
    <h3><i class="fa fa-angle-right"></i> Edit User</h3>
    <div v-if="user!==''" class="row mt">
      <div class="col-lg-12">
        <div class="form-panel">
          <form class="form-horizontal style-form" novalidate>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Name</label>
              <div class="col-sm-6">
                <input name="name" v-model="user.name" type="text" class="form-control">
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Username</label>
              <div class="col-sm-6">
                <input name="username" v-model="user.username" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">User Email</label>
              <div class="col-sm-6">
                <input name="email" v-model="user.email" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Permissions</label>
              <div class="col-sm-6">
                <label class="checkbox-inline">
                  <input type="checkbox" id="maths" name="maths" v-model="user.permissions.maths" value="option1"> Maths
                </label>
                <label class="checkbox-inline">
                  <input type="checkbox" id="physics" name="physics" v-model="user.permissions.physics" value="option2">
                  Physics
                </label>
                <label class="checkbox-inline">
                  <input type="checkbox" id="chemistry" name="chemistry" v-model="user.permissions.chemistry"
                         value="option3"> Chemistry
                </label>
                <label class="checkbox-inline">
                  <input type="checkbox" id="biology" name="biology" v-model="user.permissions.biology" value="option4">
                  Biology
                </label>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <button id="saveBtn" v-on:click.prevent="submit()" class="btn btn-theme">Save
                </button>
                <span id="processingSpinner"></span>
              </div>
            </div>
            <div class="row pt10">
              <div class="col-md-6">
                <h5 id="saveError"></h5>
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
    name: 'User-Edit',
    data: function () {
      return {
        user: ''
      }
    },
    created: function () {
      var url = '/api/admin/user/' + this.$route.query.sid
      axios.get(url).then(res => {
        this.user = res.data.user
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      submit: function () {
        var url = '/api/admin/user/' + this.$route.query.sid
        // eslint-disable-next-line no-undef
        var spinner = new Spinner({scale: 0.75}).spin()
        document.getElementById('processingSpinner').style.display = 'block'
        document.getElementById('processingSpinner').appendChild(spinner.el)
        document.getElementById('saveBtn').disabled = true

        axios.patch(url, this.user).then(res => {
          if (res.status === 200) {
            this.$router.push('/admin/users')
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
