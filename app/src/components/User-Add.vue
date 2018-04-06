<template>
  <div>
    <h3><i class="fa fa-angle-right"></i> Add a New User</h3>
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
              <label class="col-sm-2 col-sm-2 control-label">Username</label>
              <div class="col-sm-6">
                <input name="username" v-model="username" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Group</label>
              <div class="col-sm-6">
                <select v-model="group" class="form-control">
                  <option disabled value="">Please select one</option>
                  <option v-for="g in groups" v-bind:value="g.sid">{{g.name}}</option>
                </select>
              </div>
            </div>

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
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">User Email</label>
              <div class="col-sm-6">
                <input name="email" v-model="email" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Permissions</label>
              <div class="col-sm-6">
                <label class="checkbox-inline">
                  <input type="checkbox" id="maths" name="maths" v-model="maths" value="option1"> Maths
                </label>
                <label class="checkbox-inline">
                  <input type="checkbox" id="physics" name="physics" v-model="physics" value="option2"> Physics
                </label>
                <label class="checkbox-inline">
                  <input type="checkbox" id="chemistry" name="chemistry" v-model="chemistry" value="option3"> Chemistry
                </label>
                <label class="checkbox-inline">
                  <input type="checkbox" id="biology" name="biology" v-model="biology" value="option4"> Biology
                </label>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <button v-bind:disabled="!isValid" v-on:click.prevent="submit()" class="btn btn-theme">Sign Up
                </button>
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
    name: 'AddUser',
    data: function () {
      return {
        groups: '',
        name: '',
        username: '',
        password: '',
        rPassword: '',
        email: '',
        group: '',
        maths: false,
        physics: false,
        chemistry: false,
        biology: false
      }
    },
    created: function () {
      var url = '/api/admin/groups'
      axios.get(url).then(res => {
        this.groups = res.data.groups
      }).catch(err => {
        console.log(err)
      })
    },
    computed: {
      isValid: function () {
        return !this.errors.any() &&
          this.name !== '' &&
          this.username !== '' &&
          this.group !== '' &&
          this.password !== '' &&
          this.rPassword !== '' &&
          this.email !== '' &&
          this.password === this.rPassword
      }
    },
    methods: {
      submit: function () {
        var url = '/api/admin/users'
        var body = {
          name: this.name,
          username: this.username,
          password: this.password,
          email: this.email,
          maths: this.maths,
          physics: this.physics,
          biology: this.biology,
          chemistry: this.chemistry
        }

        axios.post(url, body).then(res => {
          console.log('Response', res)
          this.$router.push('/admin/users')
        }).catch(err => {
          console.log('Error', err)
        })
      }
    }
  }
</script>
<style></style>
