<template>
  <section id="app" class="main-container">
    <router-view></router-view>
  </section>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  $dark-primary-color: #303F9F;
  $default-primary-color: #3F51B5;
  $light-primary-color: #5C6BC0;
  $text-primary-color: #FFFFFF;
  $accent-color: #FF4081;
  $primary-text-color: #212121;
  $secondary-text-color: #757575;
  $divider-color: #BDBDBD;

  #login-page {
    min-height: 100%;
    background-color: $dark-primary-color;
  }

  #login-page .banner img {
    width: 420px;
    padding: 120px 0px 60px 0px;
  }

  @media only screen and (max-width: 768px) {
    #login-page .banner img {
      width: 320px;
    }
  }

  .form-login h2.form-login-heading {
    background: $accent-color;
  }

  .btn-theme {
    background: $accent-color;
  }

  .btn-theme:hover {
    background: $default-primary-color;
  }

  .modal-header {
    background: $accent-color;
  }

  .black-bg {
    background: $default-primary-color;
    border-bottom: 1px solid $dark-primary-color;
  }

  #sidebar {
    background: $dark-primary-color;
  }

  .sidebar-toggle-box {
    color: $accent-color;
  }

  .ds h3 {
    background: $default-primary-color;

  }

  ul.top-menu > li > .logout {
    color: #f2f2f2;
    border: 1px solid $accent-color !important;
    background: $accent-color;
  }

  ul.top-menu > li > .home {
    color: #f2f2f2;
    border: 1px solid $accent-color !important;
    background: $accent-color;
  }

  ul.sidebar-menu li a.active, ul.sidebar-menu li a:hover, ul.sidebar-menu li a:focus {
    background: $accent-color;
  }

  ul.sub li a.active {
    background: #424a5d;
    color: $accent-color !important;
  }

  .site-footer {
    background: $light-primary-color;
    color: $primary-text-color;
  }

  .darkblue-panel {
    background: #ffffff;

  }

  .darkblue-panel h5 {
    color: $primary-text-color;
  }

  .pt10 {
    padding-top: 10px;
  }

  .pt20 {
    padding-top: 20px;
  }

  .pt40 {
    padding-top: 40px;
  }

  .pt60 {
    padding-top: 60px;
  }

  .pt80 {
    padding-top: 80px;
  }

  .pb5 {
    padding-bottom: 5px;
  }

  .pb10 {
    padding-bottom: 10px;
  }

  .pb20 {
    padding-bottom: 20px;
  }

  .pb40 {
    padding-bottom: 40px;
  }

  .pb60 {
    padding-bottom: 60px;
  }

  .pr20 {
    padding-right: 20px;
  }

  .pr10 {
    padding-right: 10px;
  }

  .mr10 {
    margin-right: 10px;
  }

  .mb10 {
    margin-bottom: 10px;
  }

  .mb20 {
    margin-bottom: 20px;
  }

  .mt10 {
    margin-top: 10px;
  }

  .mt20 {
    margin-top: 20px;
  }

  .hrefbtn {
    color: #f2f2f2;
    border: 1px solid #FF4081 !important;
    background: #FF4081;
    padding: 5px;
    border-radius: 5px;
    float: right;
    margin-right: 40px;
  }

  #processingSpinner {
    position: fixed; /* Sit on top of the page content */
    display: none; /* Hidden by default */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
  }

  #deleteError {
    color: red;
  }

  .red {
    color: red;
    font-weight: bold;
    text-transform: uppercase;
  }

  .green {
    color: forestgreen;
    font-weight: bold;
    text-transform: uppercase;
  }

  .accentColor {
    color: $accent-color
  }

  .h100 {
    height: 100%;
  }
</style>
