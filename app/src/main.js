// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Validate from 'vee-validate'
import App from './App'
import router from './router'
import S3Plugin from './plugins/s3-plugin'
import JwtPlugin from './plugins/jwt-plugin'

Vue.use(S3Plugin)
Vue.use(JwtPlugin)
Vue.use(Validate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
