<template>
  <div id="nns234">
    <header class="header black-bg">
      <div class="sidebar-toggle-box">
        <div class="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
      </div>
      <a href="home.ejs" class="logo"><b>EDUWIZZ</b></a>
      <div class="top-menu">
        <ul class="nav pull-right top-menu">
          <li><a class="home" href="#/">Home</a></li>
          <li><a class="logout" v-on:click="logout()" href="#">Logout</a></li>
        </ul>
      </div>
    </header>
    <aside>
      <div id="sidebar" class="nav-collapse ">
        <ul class="sidebar-menu" id="nav-accordion">
          <p class="centered">
            <a href="profile.html">
              <img src="/static/img/owl2_128_128.png" class="img-circle" width="60">
            </a>
          </p>
          <h5 class="centered">{{loggedInUser.name}}</h5>
          <li class="mt">
            <a class="active" href="#/">
              <i class="fa fa-dashboard"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <!--  <li>
              <a href="#/upload">
                <i class="fa fa-barcode "></i>
                <span>Upload Answer Sheets</span>
              </a>
            </li>-->

          <li v-if="isAdminLoggedIn()" class="sub-menu">
            <a href="javascript:;">
              <i class="fa fa-desktop"></i>
              <span>Admin</span>
            </a>
            <ul class="sub">
              <li><a href="#/admin/groups">Groups</a></li>
              <li><a href="#/admin/users">Users</a></li>
              <!--li><a href="#/admin/papers">Papers</a></li-->
              <li><a href="#/admin/papers/correct">Correct Papers</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
    <section id="main-content">
      <section id="main-wrapper" class="wrapper">
        <router-view></router-view>
      </section>
    </section>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        loggedInUsed: ''
      }
    },
    created: function () {
      this.loggedInUser = JSON.parse(Vue.loggedInUser())
    },
    methods: {
      logout: function () {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('token')
        this.$router.push('/login')
      },
      isAdminLoggedIn: function () {
        return Vue.isAdminLoggedIn()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media (min-width: 768px) {
    #main-wrapper {
      height: 800px
    }
  }


</style>
