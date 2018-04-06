<template>
  <div>
    <h3><i class="fa fa-angle-right"></i>Download: {{fileName}}</h3>
    <div class="row center-container">
      <div class="col-md-12">
        <img class="center-block" src="/static/img/owl3_200_220.png"/>
      </div>
      <div class="mt10 col-md-12 text-center">
        <a v-bind:disabled="!isValid"
           v-bind:href="downloadUrl">Click this Link to Download</a>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'Download',
    data: function () {
      return {
        downloadUrl: '#'
      }
    },
    computed: {
      isValid: function () {
        return false
      },
      fileName: function () {
        return this.$route.query.name
      }
    },
    created: function () {
      var headers = {'Authorization': 'JWT ' + localStorage.getItem('token')}
      axios.get('/api/aws/sign/get?key=' + this.$route.query.key, {headers: headers}).then(res => {
        this.downloadUrl = res.data.url
      }).catch(e => {
        this.$router.push('/error?status=' + e.response.status + '&message=' + e.response.data.message)
      })
    }
  }
</script>
<style>
  .text-center {
    text-align: center
  }

  .center-container {
    position: absolute;
    top: 40%;
    left: 50%
  }
</style>
