<template>
  <div>
    <h3><i class="fa fa-angle-right"></i> Edit Group</h3>
    <div v-if="group != ''" class="row mt">
      <div class="col-lg-12">
        <div class="form-panel">
          <form class="form-horizontal style-form" novalidate>

            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Name</label>
              <div class="col-sm-6">
                <input name="name" v-model="group.name" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Description</label>
              <div class="col-sm-6">
                <input name="description" v-model="group.description" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Email</label>
              <div class="col-sm-6">
                <input name="contactEmail" v-model="group.contactEmail" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Phone</label>
              <div class="col-sm-6">
                <input name="contactPhone" v-model="group.contactPhone" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Status</label>
              <div class="col-sm-6">
                <label class="checkbox-inline">
                  <input type="radio" id="active" name="status" v-model="group.status" value="ACTIVE"> Active
                </label>
                <label class="checkbox-inline">
                  <input type="radio" id="inactive" name="status" v-model="group.status" value="INACTIVE"> Inactive
                </label>
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
    name: 'EditGroup',
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
        document.getElementById('saveBtn').disabled = true

        axios.patch(url, this.group).then(res => {
          if (res.status === 200) {
            this.$router.push('/admin/groups')
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
