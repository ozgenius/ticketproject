import Vue from "vue";
import Vuex from "vuex";
import store from "../store";

Vue.use(Vuex);

const musteri = (to, from, next) => {
  if (store.getters.user == "musteri") {
    next()
  } else {
    next('/')
  }
}
const admin = (to, from, next) => {
  if (store.getters.user == "admin") {
    next()
  } else {
    next('/')
  }
}
export {musteri, admin} ;
