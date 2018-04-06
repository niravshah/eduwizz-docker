<template>
  <div>
    <h3><i class="fa fa-angle-right"></i> Deactivate Group</h3>
    <div v-if="group !== ''" class="row mt">
      <div class="col-lg-12">
        <div class="row pb10">
          <label class="col-sm-2 col-sm-2 control-label">Name</label>
          <div class="col-sm-6">
            <p>{{group.name}}</p>
          </div>
        </div>

        <div class="row pb10">
          <label class="col-sm-2 col-sm-2 control-label">Description</label>
          <div class="col-sm-6">
            <p>{{group.description}}</p>
          </div>
        </div>
        <div class="row pb10">
          <label class="col-sm-2 col-sm-2 control-label">Phone</label>
          <div class="col-sm-6">
            <p>{{group.contactPhone}}</p>
          </div>
        </div>
        <div class="row pb10">
          <label class="col-sm-2 col-sm-2 control-label">Email</label>
          <div class="col-sm-6">
            <p>{{group.contactEmail}}</p>
          </div>
        </div>
        <div class="pt20 row">
          <div class="col-md-6">
            <h4>Are you sure you want to deactivate group?</h4>
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
    name: 'DeleteGroup',
    data: function () {
      return {
        group: ''
      }
    },
    created: function () {
      var url = '/api/admin/group/' + this.$route.query.sid
      axios.get(url).then(res => {
        this.group = res.data.group
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      submit: function () {
        var url = '/api/admin/group/' + this.$route.query.sid
        // eslint-disable-next-line no-undef
        var spinner = new Spinner({scale: 0.75}).spin()
        document.getElementById('processingSpinner').style.display = 'block'
        document.getElementById('processingSpinner').appendChild(spinner.el)
        document.getElementById('deleteBtn').disabled = true

        axios.patch(url, {status: 'INACTIVE'}).then(res => {
          if (res.status === 200) {
            this.$router.push('/admin/groups')
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
<style></style>
