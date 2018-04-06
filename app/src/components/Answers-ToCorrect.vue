<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h3><i class="fa fa-angle-right"></i> Uploaded Answer Sheets</h3>
      </div>
    </div>

    <div v-if="papers.length > 0" class="row mt">
      <div class="col-lg-12">
        <div class="content-panel">
          <section id="no-more-tables">
            <table class="table table-bordered table-striped table-condensed cf">
              <thead class="cf">
              <tr>
                <th>Question Paper Id</th>
                <th>Student Id</th>
                <th>Status</th>
                <th>Submitted Papers</th>
                <th>Corrected Papers</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="a in papers">
                <td data-title="Question Paper Id">{{a.questionPaperId}}</td>
                <td data-title="Student Id">{{a.sid}}</td>
                <td data-title="Status">{{a.status}}</td>
                <td data-title="Keys">
                  <a v-for="key in a.keys" v-bind:href="'#/download?key=' + key">Link</a>
                </td>
                <td data-title="Corrected Papers">
                  <a v-bind:href="'#/admin/papers/correct/upload?sid='+a.sid + '&qid=' + a.questionPaperId"
                     class="pr10">Upload</a>
                </td>
              </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
  import axios from 'axios'
  import Vue from 'vue'
  export default {
    name: 'Uploaded',
    data: function () {
      return {
        loggedInUser: '',
        sid: '',
        papers: []
      }
    },
    created: function () {
      this.loggedInUser = JSON.parse(Vue.loggedInUser())
      this.sid = this.loggedInUser.sid

      var url = '/api/papers/status/new'
      axios.get(url).then(res => {
        this.papers = res.data.papers
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>
<style></style>
