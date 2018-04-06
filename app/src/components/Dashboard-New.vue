<template>
  <div class="row h100">
    <div class="col-lg-9 main-chart">
      <div class="row mt">
        <div class="col-md-4 col-sm-4 mb">
          <a href="#/answers/submit">
            <div class="darkblue-panel pn">
              <div class="darkblue-header">
                <h5>UPLOAD ANSWER SHEET</h5>
              </div>
              <div class="mt mb text-center">
                <img src="/static/img/answer-sheet.png">
              </div>
              <footer>
                <div class="centered">
                  <h5><i class="fa fa-file-text-o"></i> {{counts.maths}} Papers</h5>
                </div>
              </footer>
            </div>
          </a>
        </div>

        <div class="col-md-4 col-sm-4 mb">
          <a href="#/results">
            <div class="darkblue-panel pn">
              <div class="darkblue-header">
                <h5>VIEW RESULTS</h5>
              </div>
              <div class="mt mb text-center">
                <img src="/static/img/results.png">
              </div>
              <footer>
                <div class="centered">
                  <h5><i class="fa fa-file-text-o"></i> {{counts.maths}} Papers</h5>
                </div>
              </footer>
            </div>
          </a>
        </div>
      </div>
      <!-- Leader Board START -->
      <!--
      <div class="row mt">
        <div class="col-md-12">
          <h4><i class="fa fa-angle-right"></i> Your Team Leaderboard</h4>
          <div class="row">
            <div class="col-md-12 mb">
              <div class="main-box no-header clearfix">
                <div class="main-box-body clearfix">
                  <div class="table-responsive">
                    <table class="table user-list">
                      <thead>
                      <tr>
                        <th><span>Position</span></th>
                        <th><span>Person</span></th>
                        <th><span>Papers</span></th>
                        <th><span>Answers</span></th>
                        <th><span>Points</span></th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="l in lb">
                        <td>{{l.rank}}</td>
                        <td>
                          <img v-bind:src="l.avatar" alt="">
                          <a href="#" class="user-link">{{l.name}}</a>
                          <span class="user-subhead">{{l.sub}}</span>
                        </td>
                        <td>{{l.papers}}</td>
                        <td>{{l.answers}}</td>
                        <td>{{l.points}}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      -->
      <!-- Leader Board END -->
    </div>
    <!--div class="col-lg-3 ds h100" -->
    <!--Activity Stream START -->
    <!--
    <div class="desc">
      <div class="thumb">
        <img class="img-circle" src="/static/img/owl_48_48.png" width="45px" height="45px" align="">
      </div>
      <div class="details">
        <p>
          <span class="muted">18 Hours Ago</span>
          <br/>
          <a href="#">DIVYA MANIAN</a>
          answered Maths Numbers 1 paper
        </p>
      </div>
    </div>
    -->
    <!--Activity Stream END -->
    <!--/div-->
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  export default {
    name: 'NewDashboard',
    data: function () {
      return {
        counts: {
          maths: 0,
          physics: 0,
          chemistry: 0,
          biology: 0
        },
        lb: []
      }
    },
    created: function () {
      var url = '/api/admin/papers/count'
      axios.get(url).then(res => {
        this.counts = res.data.count
      }).catch(err => {
        console.log(err)
      })

      this.lb = [{
        rank: 1,
        avatar: '/static/img/owl_48_48.png',
        name: 'Divya Manian',
        answers: 12,
        points: 24,
        sub: 'Last Active 2 hrs ago',
        papers: 4
      }, {
        rank: 2,
        avatar: '/static/img/owl2_48_48.png',
        name: 'Rohan Doshi',
        answers: 12,
        points: 24,
        sub: 'Last Active 1 hrs ago',
        papers: 3
      }, {
        rank: 3,
        avatar: '/static/img/owl3_48_48.png',
        name: 'Joslin Joshi',
        answers: 12,
        points: 24,
        sub: 'Last Active 4 hrs ago',
        papers: 2
      }]
    },
    methods: {
      hasMathsPerm: function () {
        return Vue.hasMathsPerm()
      },
      hasPhysicsPerm: function () {
        return Vue.hasPhysicsPerm()
      },
      hasChemistryPerm: function () {
        return Vue.hasChemistryPerm()
      },
      hasBiologyPerm: function () {
        return Vue.hasBiologyPerm()
      }
    }
  }
</script>
<style scoped>
  .ds .thumb {
    width: 50px;
    margin: 0 10px 0 10px;
    display: block;
    float: left;
  }

  .ds span.muted {
    font-size: 9px;
    text-transform: uppercase;
    font-style: italic;
    color: #666666;
  }

  .main-box.no-header {
    padding-top: 20px;
  }

  .main-box {
    background: #FFFFFF;
    -webkit-box-shadow: 1px 1px 2px 0 #CCCCCC;
    -moz-box-shadow: 1px 1px 2px 0 #CCCCCC;
    -o-box-shadow: 1px 1px 2px 0 #CCCCCC;
    -ms-box-shadow: 1px 1px 2px 0 #CCCCCC;
    box-shadow: 1px 1px 2px 0 #CCCCCC;
    margin-bottom: 16px;
    -webikt-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }

  .table a.table-link.danger {
    color: #e74c3c;
  }

  .label {
    border-radius: 3px;
    font-size: 0.875em;
    font-weight: 600;
  }

  .user-list tbody td .user-subhead {
    font-size: 0.875em;
    font-style: italic;
  }

  .user-list tbody td .user-link {
    display: block;
    font-size: 1.25em;
    padding-top: 3px;
    margin-left: 60px;
  }

  a {
    color: #3498db;
    outline: none !important;
  }

  .user-list tbody td > img {
    position: relative;
    max-width: 50px;
    float: left;
    margin-right: 15px;
  }

  .table thead tr th {
    text-transform: uppercase;
    font-size: 0.875em;
  }

  .table thead tr th {
    border-bottom: 2px solid #e7ebee;
  }

  .table tbody tr td:first-child {
    font-size: 1.125em;
    font-weight: 300;
  }

  .table tbody tr td {
    font-size: 0.875em;
    vertical-align: middle;
    border-top: 1px solid #e7ebee;
    padding: 12px 8px;
  }

</style>
