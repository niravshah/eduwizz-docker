<template>
  <div>
    <h3><i class="fa fa-angle-right"></i> Add a New Group</h3>
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
              <label class="col-sm-2 col-sm-2 control-label">Email</label>
              <div class="col-sm-6">
                <input name="contactEmail" v-model="contactEmail" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Phone</label>
              <div class="col-sm-6">
                <input name="contactPhone" v-model="contactPhone" type="text" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 col-sm-2 control-label">Status</label>
              <div class="col-sm-6">
                <label class="checkbox-inline">
                  <input type="radio" id="active" name="status" v-model="status" value="ACTIVE"> Active
                </label>
                <label class="checkbox-inline">
                  <input type="radio" id="inactive" name="status" v-model="status" value="INACTIVE"> Inactive
                </label>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button v-bind:disabled="!isValid" v-on:click.prevent="submit()" class="btn btn-theme">Save
                </button>
                <span id="uploadError"></span>
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
    name: 'AddGroup',
    data: function () {
      return {
        name: '',
        description: '',
        contactEmail: '',
        contactPhone: '',
        status: ''
      }
    },
    computed: {
      isValid: function () {
        return !this.errors.any() &&
          this.name !== ''
      }
    },
    methods: {
      submit: function () {
        var url = '/api/admin/groups'
        var body = {
          name: this.name,
          description: this.description,
          contactEmail: this.contactEmail,
          contactPhone: this.contactPhone
        }
        axios.post(url, body).then(res => {
          if (res.status === 200) {
            this.$router.push('/admin/groups')
          } else {
            document.getElementById('uploadError').innerHTML = '<p>' + res.data.message + '</p>'
          }
        }).catch(err => {
          console.log('Error', err)
          document.getElementById('uploadError').innerHTML = '<p>Error Uploading File</p>'
        })
      }
    }
  }
</script>
<style></style>
