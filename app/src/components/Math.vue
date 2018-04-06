<template>
  <div>
    <div class="row mt">
      <div class="col-md-12">
        <h1>Maths Papers</h1>
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
                <th>Description</th>
                <th>Download Link</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="paper in papers">
                <td data-title="name">{{paper.topic}}</td>
                <td data-title="name">{{paper.name}}</td>
                <td data-title="description">{{paper.description}}</td>
                <td data-title="link"><a v-bind:href="'#/download?key=' + paper.key + '&name=' + paper.name">Link</a></td>
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
    name: 'Math',
    data: function () {
      return {
        papers: []
      }
    },
    created: function () {
      var url = '/api/admin/papers/maths'
      axios.get(url).then(res => {
        this.papers = res.data.papers
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>
<style></style>
