export default {
  state: {
    messages: []
  },
  mutations: {
    fetchMessages(state, payload) {
      state.messages = payload;
    },
    addMessage(state, payload) {
      state.messages = [...state.messages, payload ];
    }
  },
  actions: {
    addNewMessage({ commit }, payload) {
      console.log(payload);
      axios.post(`http://localhost:4000/message/ticket/${payload.ticketId}`, payload.messageData)
      .then(res => {
        console.log(res.data);
        commit("addMessage", res.data);
        console.log(res.data)
    
      })
      .catch(err => {
        console.error(err); 
      })  
    },
    fetchMessages({ commit }, ticketId) {
      console.log(ticketId);
      axios.get(`http://localhost:4000/message/ticket/${ticketId}`)
      .then(res => {
        console.log(res.data);
        console.log(res.data)
        commit('fetchMessages', res.data)
      })
      .catch(err => {
        console.error(err); 
      })  
    }
  },

  getters: {
    messages(state) {
      return state.messages;
    }
  }
};
