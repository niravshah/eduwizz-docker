<template>
  <div id="login-page">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center banner">
          <img alt="Eduwizz" src="/static/img/banner_w.png">
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <form class="form-login" novalidate>
            <h2 class="form-login-heading">sign in now</h2>
            <div class="login-wrap text-center">
              <div class="row pb10 pt10">
                <div v-if="messages.length > 0" class="col-md-12 text-center">
                  <p :class="m.type" v-for="m in messages">{{m.message}}</p>
                </div>
              </div>
              <div class="row pb10">
                <div class="col-md-12">
                  <input type="text" class="form-control" name="username" v-model="username" placeholder="User ID"
                         autofocus
                         v-validate="'required'">
                  <small class="pt10 error" v-show="errors.has('username')">
                    {{ errors.first('username')}}
                  </small>
                </div>
              </div>
              <div class="row pb20">
                <div class="col-md-12">
                  <input type="password" v-model="password" name="password" class="form-control" placeholder="Password"
                         v-validate="'required'">
                  <small class="pt10 error" v-show="errors.has('password')">
                    {{ errors.first('password')}}
                  </small>
                </div>
              </div>
              <div class="row pt10 pb20">
                <div class="col-md-12">
                  <button class="btn btn-theme btn-block" href="index.html" v-bind:disabled="!isValid"
                          v-on:click.prevent="login()"
                          type="button"><i class="fa fa-lock"></i>SIGN IN
                  </button>
                </div>
              </div>
            </div>
            <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal"
                 class="modal fade">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                      &times;
                    </button>
                    <h4 class="modal-title">Forgot Password ?</h4>
                  </div>
                  <div class="modal-body">
                    <p>Enter your e-mail address below to reset your password.</p>
                    <input type="text" name="email" placeholder="Email" autocomplete="off"
                           class="form-control placeholder-no-fix">
                  </div>
                  <div class="modal-footer">
                    <button data-dismiss="modal" class="btn btn-default" type="button">Cancel
                    </button>
                    <button class="btn btn-theme" type="button">Submit</button>
                  </div>
                </div>
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
    name: 'login',
    data: function () {
      return {
        messages: [],
        username: '',
        password: ''
      }
    },
    computed: {
      isValid: function () {
        return !this.errors.any() &&
          this.username !== '' &&
          this.password !== ''
      }
    },
    methods: {
      login: function () {
        var url = '/api/auth/login'
        var body = {username: this.username, password: this.password}

        axios.post(url, body).then(res => {
          var token = res.data.token
          if (token) {
            var email = res.data.email
            localStorage.setItem('token', token)
            localStorage.setItem('currentUser', JSON.stringify({
              name: res.data.name,
              email: email,
              username: this.username,
              token: token,
              sid: res.data.sid,
              permissions: res.data.permissions
            }))
            this.$router.push('/')
          } else {
            this.messages.push({type: 'error', message: 'Username or password incorrect'})
          }
        }).catch(err => {
          if (err.response.status === 404) {
            this.messages.push({type: 'error', message: 'We could not contact our server at this point.'})
          } else if (err.response.status === 403) {
            this.messages.push({type: 'error', message: 'Username or password incorrect'})
          } else {
            this.messages.push({type: 'error', message: err.message})
          }
        })
      }
    }
  }
</script>

<style>

</style>
