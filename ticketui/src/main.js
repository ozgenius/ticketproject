import Vue from 'vue'
import './plugins'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from "vuetify";



Vue.use(Vuetify);

import VueStringFilter from "vue-string-filter";
Vue.use(VueStringFilter);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
