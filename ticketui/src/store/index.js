import Vue from "vue";
import Vuex from "vuex";
import ticket from "./modules/ticket";
import shared from "./modules/shared";
import user from "./modules/user";
import message from "./modules/message";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    shared: shared,
    ticket: ticket,
    user: user,
    mesage: message
  }
}
);
export default store;
