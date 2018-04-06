<template>
  <div>
    <h3><i class="fa fa-angle-right"></i>Reset Password: <span v-if="user!==''" class="accentColor">{{user.name}}</span>
    </h3>
    <div class="row mt">
      <div class="col-lg-12">
        <div class="form-panel">
          <form class="form-horizontal style-form" novalidate>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Password</label>
              <div class="col-sm-6">
                <input name="password" v-model="password" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Repeat Password</label>
              <div class="col-sm-6">
                <input name="rPassword" v-model="rPassword" type="text" class="form-control">
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button id="resetBtn" v-bind:disabled="!isValid" v-on:click.prevent="submit()" class="btn btn-theme">
                  Reset Password
                </button>
                <span id="processingSpinner"></span>
              </div>
            </div>
            <div class="row pt10">
              <div class="col-md-6">
                <h5 id="resetError"></h5>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  /* eslint-disable indent */

  import axios from 'axios'

  export default {
    name: 'User-Password',
    data: function () {
      return {
        password: '',
        rPassword: '',
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
    computed: {
      isValid: function () {
        return !this.errors.any() &&
          this.password !== '' &&
          this.rPassword !== '' &&
          this.password === this.rPassword
      }
    },
    methods: {
      submit: function () {
        var url = '/api/admin/user/' + this.$route.query.sid + '/reset'
        // eslint-disable-next-line no-undef
        var spinner = new Spinner({scale: 0.75}).spin()
        document.getElementById('processingSpinner').style.display = 'block'
        document.getElementById('processingSpinner').appendChild(spinner.el)
        document.getElementById('resetBtn').disabled = true

        var body = {
          password: this.password
        }
        axios.patch(url, body).then(res => {
            if (res.status === 200) {
              this.stopSpinner(spinner)
              document.getElementById('resetError').innerText = 'Password reset successful'
            } else {
              document.getElementById('resetError').innerText = 'Could not reset password'
            }
          }
        ).catch(err => {
          this.stopSpinner(spinner)
          document.getElementById('resetError').innerText = err.message
          console.log('Error', err)
        })
      },
      stopSpinner: function (spinner) {
        spinner.stop()
        document.getElementById('processingSpinner').style.display = 'none'
        document.getElementById('resetBtn').disabled = false
      }
    }
  }
</script>
<style></style>
