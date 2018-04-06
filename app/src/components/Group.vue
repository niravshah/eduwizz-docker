<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h3><i class="fa fa-angle-right"></i> Current Groups</h3>
        <a class="hrefbtn" href="#/admin/groups/add">Add Group</a>
      </div>
    </div>
    <div v-if="groups.length > 0" class="row mt">
      <div class="col-lg-12">
        <div class="content-panel">
          <section id="no-more-tables">
            <table class="table table-bordered table-striped table-condensed cf">
              <thead class="cf">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="group in groups">
                <td data-title="name">{{group.name}}</td>
                <td data-title="description">{{group.description}}</td>
                <td data-title="contactEmail">{{group.contactEmail}}</td>
                <td data-title="contactPhone">{{group.contactPhone}}</td>
                <td v-bind:class="{red:!isGroupActive(group), green:isGroupActive(group)}" data-title="active">
                  {{group.status}}
                </td>
                <td data-title="actions">
                  <a v-if="isGroupActive(group)" v-bind:href="'#/admin/groups/edit?sid='+group.sid"
                     class="pr10">Edit</a>
                  <a v-if="isGroupActive(group)" v-bind:href="'#/admin/groups/delete?sid='+group.sid">Deactivate</a>
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
    name: 'Group',
    data: function () {
      return {
        groups: []
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
    methods: {
      isGroupActive: function (gr) {
        return gr.status === 'ACTIVE'
      }
    }
  }
</script>
<style></style>
