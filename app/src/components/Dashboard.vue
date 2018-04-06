<template>
  <div class="row">
    <div class="col-lg-9 main-chart">
      <div class="row mt">
        <div v-if="hasMathsPerm()" class="col-md-4 col-sm-4 mb">
          <a href="#/maths">
            <div class="darkblue-panel pn">
              <div class="darkblue-header">
                <h5>MATHS</h5>
              </div>
              <div class="mt mb text-center">
                <img src="/static/img/maths.png">
              </div>
              <footer>
                <div class="centered">
                  <h5><i class="fa fa-file-text-o"></i> {{counts.maths}} Papers</h5>
                </div>
              </footer>
            </div>
          </a>
        </div>
        <div v-if="hasPhysicsPerm()" class="col-md-4 col-sm-4 mb">
          <a href="#/physics">
            <div class="darkblue-panel pn">
              <div class="darkblue-header">
                <h5>PHYSICS</h5>
              </div>
              <div class="mt mb text-center">
                <img src="/static/img/physics.png">
              </div>
              <footer>
                <div class="centered">
                  <h5><i class="fa fa-file-text-o"></i> {{counts.physics}} Papers</h5>
                </div>
              </footer>
            </div>
          </a>
        </div>
        <div v-if="hasBiologyPerm()" class="col-md-4 col-sm-4 mb">
          <a href="#/biology">
            <div class="darkblue-panel pn">
              <div class="darkblue-header">
                <h5>BIOLOGY</h5>
              </div>
              <div class="mt mb text-center">
                <img src="/static/img/biology.png">
              </div>
              <footer>
                <div class="centered">
                  <h5><i class="fa fa-file-text-o"></i> {{counts.biology}} Papers</h5>
                </div>
              </footer>
            </div>
          </a>
        </div>
        <div v-if="hasChemistryPerm()" class="col-md-4 col-sm-4 mb">
          <a href="#/chemistry">
            <div class="darkblue-panel pn">
              <div class="darkblue-header">
                <h5>CHEMISTRY</h5>
              </div>
              <div class="mt mb text-center">
                <img src="/static/img/chemistry.png">
              </div>
              <footer>
                <div class="centered">
                  <h5><i class="fa fa-file-text-o"></i> {{counts.physics}} Papers</h5>
                </div>
              </footer>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  export default {
    name: 'dashboard',
    data: function () {
      return {
        counts: {
          maths: 0,
          physics: 0,
          chemistry: 0,
          biology: 0
        }
      }
    },
    created: function () {
      var url = '/api/admin/papers/count'
      axios.get(url).then(res => {
        this.counts = res.data.count
      }).catch(err => {
        console.log(err)
      })
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
<style></style>
