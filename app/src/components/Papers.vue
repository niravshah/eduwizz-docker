<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h3><i class="fa fa-angle-right"></i> Current Papers</h3>
        <a class="hrefbtn" href="#/admin/papers/add">Add Paper</a>
      </div>
    </div>
    <div v-if="papers.length > 0" class="row mt">
      <div class="col-lg-12">
        <div class="content-panel">
          <section id="no-more-tables">
            <table class="table table-bordered table-striped table-condensed cf">
              <thead class="cf">
              <tr>
                <th>Topic</th>
                <th>Paper</th>
                <th>Subject</th>
                <th>Description</th>
                <th>Active</th>
                <th>Download Link</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="paper in papers">
                <td data-title="name">{{paper.topic}}</td>
                <td data-title="name">{{paper.name}}</td>
                <td data-title="subject">{{paper.subject}}</td>
                <td data-title="description">{{paper.description}}</td>
                <td v-bind:class="{red:!paper.active, green:paper.active}" data-title="active">{{paper.active}}</td>
                <td data-title="link"><a v-bind:href="'#/download?key=' + paper.key">Link</a></td>
                <td data-title="actions">
                  <a v-if="paper.active" v-bind:href="'#/admin/papers/edit?sid='+paper.sid" class="pr10">Edit</a>
                  <a v-if="paper.active" v-bind:href="'#/admin/papers/delete?sid='+paper.sid">Deactivate</a>
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
    name: 'Papers',
    data: function () {
      return {
        papers: []
      }
    },
    created: function () {
      var url = '/api/admin/papers'
      axios.get(url).then(res => {
        this.papers = res.data.papers
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>
<style></style>
