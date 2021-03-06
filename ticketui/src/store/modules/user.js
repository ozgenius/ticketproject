export default {
    state: {
      user: null
    },
    mutations: {
      setUser(state, payload) {
        state.user = payload;
      },
    },
    actions: {
      setUser({ commit }, payload) {
        commit('setUser', payload);
      }
    },
    getters: {
      user(state) {
        return state.user;
      }
    }
  };
  