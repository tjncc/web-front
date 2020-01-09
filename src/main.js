import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Routes from './routes'
import VueSession from 'vue-session'
import VModal from 'vue-js-modal'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueSession);
Vue.use(VModal, { resizable: true } )

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
