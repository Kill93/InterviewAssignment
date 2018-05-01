import 'bootstrap';

import Vue from 'vue'
import App from './App.vue'
import Home from './Components/Home.vue'
import Header from './Components/Header'
import Footer from './Components/Footer.vue'
import Day from './Components/Day'
import VueRouter from 'vue-router'

Vue.component('app-home', Home)
Vue.component('app-header', Header)
Vue.component('app-footer', Footer)
Vue.component('app-day', Day)

Vue.use(VueRouter)

const routes = [
  { name: 'home' , path: '/', component: Home },
  { name: 'day' , path: '/day', component: Day }
]

const router = new VueRouter ({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
