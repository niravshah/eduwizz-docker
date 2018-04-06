<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h3><i class="fa fa-angle-right"></i> Current Users</h3>
        <a class="hrefbtn" href="#/admin/users/add">Add Users</a>
      </div>
    </div>
    <div v-if="users.length > 0" class="row mt">
      <div class="col-lg-12">
        <div class="content-panel">
          <section id="no-more-tables">
            <table class="table table-bordered table-striped table-condensed cf">
              <thead class="cf">
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Active</th>
                <th>Maths</th>
                <th>Physics</th>
                <th>Chemistry</th>
                <th>Biology</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="user in users">
                <td data-title="name">{{user.name}}</td>
                <td data-title="username">{{user.username}}</td>
                <td v-bind:class="{red:!user.active, green:user.active}" data-title="active">{{user.active}}</td>
                <td data-title="maths">{{user.permissions.maths}}</td>
                <td data-title="physics">{{user.permissions.physics}}</td>
                <td data-title="chemistry">{{user.permissions.chemistry}}</td>
                <td data-title="biology">{{user.permissions.biology}}</td>
                <td data-title="actions">
                  <a v-if="user.active" v-bind:href="'#/admin/users/edit?sid='+user.sid" class="pr10">Edit</a>
                  <a v-if="user.active" v-bind:href="'#/admin/users/reset-password?sid='+user.sid" class="pr10">Reset Password</a>
                  <a v-if="user.active" v-bind:href="'#/admin/users/delete?sid='+user.sid">Deactivate</a>
                </td>
              </tr>
              </tbody>
            </table>
          </section>
        </div><!-- /content-panel -->
      </div><!-- /col-lg-12 -->
    </div><!-- /row -->
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'Users',
    data: function () {
      return {
        users: []
      }
    },
    created: function () {
      var url = '/api/admin/users'
      axios.get(url).then(res => {
        this.users = res.data.users
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>
<style>

</style>
