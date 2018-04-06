<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h3><i class="fa fa-angle-right"></i> Results</h3>
      </div>
    </div>

    <div v-if="answers.length > 0" class="row mt">
      <div class="col-lg-12">
        <div class="content-panel">
          <section id="no-more-tables">
            <table class="table table-bordered table-striped table-condensed cf">
              <thead class="cf">
              <tr>
                <th>Question Paper Id</th>
                <th>Status</th>
                <th>Download Corrected Paper</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="a in answers">
                <td data-title="Question Paper Id">{{a.questionPaperId}}</td>
                <td data-title="Status">{{a.status}}</td>
                <td data-title="Keys">
                  <a v-for="key in a.keys" v-bind:href="'#/download?key=' + key">Link</a>
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
    name: 'Results',
    data: function () {
      return {
        loggedInUser: '',
        sid: '',
        answers: []
      }
    },
    created: function () {
      this.loggedInUser = JSON.parse(Vue.loggedInUser())
      this.sid = this.loggedInUser.sid

      var url = '/api/answers/' + this.sid
      axios.get(url).then(res => {
        this.answers = res.data.answers
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>
<style></style>
