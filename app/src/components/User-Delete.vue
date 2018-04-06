<template>
  <div>
    <h3><i class="fa fa-angle-right"></i> Deactivate User</h3>
    <div v-if="user !== ''" class="row mt">
      <div class="col-lg-12">
        <div class="row pb10">
          <label class="col-sm-2 col-sm-2 control-label">Name</label>
          <div class="col-sm-6">
            <p>{{user.name}}</p>
          </div>
        </div>

        <div class="row pb10">
          <label class="col-sm-2 col-sm-2 control-label">Username</label>
          <div class="col-sm-6">
            <p>{{user.username}}</p>
          </div>
        </div>
        <div class="row pb10">
          <label class="col-sm-2 col-sm-2 control-label">User Email</label>
          <div class="col-sm-6">
            <p>{{user.email}}</p>
          </div>
        </div>
        <div class="row pb10">
          <label class="col-sm-2 col-sm-2 control-label">Permissions</label>
          <div class="col-sm-6">
            <label class="checkbox-inline">
              <input type="checkbox" id="maths" disabled="disabled" name="maths" v-model="user.permissions.maths"> Maths
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" id="physics" disabled="disabled" name="physics" v-model="user.permissions.physics">
              Physics
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" id="chemistry" disabled="disabled" name="chemistry"
                     v-model="user.permissions.chemistry"> Chemistry
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" id="biology" disabled="disabled" name="biology" v-model="user.permissions.biology">
              Biology
            </label>
          </div>
        </div>
        <div class="pt20 row">
          <div class="col-md-6">
            <h4>Are you sure you want to deactivate user?</h4>
            <button id="deleteBtn" v-on:click.prevent="submit()" class="btn btn-theme">Deactivate
            </button>
            <span id="processingSpinner"></span>
          </div>
        </div>
        <div class="row pt10">
          <div class="col-md-6">
            <h5 id="deleteError"></h5>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import axios from 'axios'
  export default {
    name: 'User-Delete',
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
        document.getElementById('deleteBtn').disabled = true

        axios.patch(url, {active: false}).then(res => {
          if (res.status === 200) {
            this.$router.push('/admin/users')
          } else {
            this.stopSpinner(spinner)
          }
        }).catch(err => {
          this.stopSpinner(spinner)
          document.getElementById('deleteError').innerText = err.message
        })
      },
      stopSpinner: function (spinner) {
        spinner.stop()
        document.getElementById('processingSpinner').style.display = 'none'
        document.getElementById('deleteBtn').disabled = false
      }
    }
  }
</script>
<style>

</style>
