import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import { sync } from 'vuex-router-sync'
import { createStore } from './store/index'
import bootstrap from 'bootstrap'
import App from 'components/app-root'

Vue.use(Vuex)

const http = Vue.prototype.$http
const storeOverrides = {}
const store = createStore(http, storeOverrides)

sync(store, router)

const app = new Vue({
  store,
  router,
  ...App
})

export { app, router, store }
