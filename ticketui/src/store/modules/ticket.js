import axios from "axios";
export default {
  state: {
    tickets: [],
    currentticket: null
  },
  mutations: {
    fetchTickets(state, payload) {
      state.tickets = payload;
    },
    addticket(state, payload) {
      state.tickets = [...state.tickets,  payload ];
    },
    cleartickets(state){
      state.tickets = [];
    },
    changeticket(state, payload) {
      state.currentticket = payload;
    }
  },
  actions: {
    addticket({ commit }, payload) {
      console.log(payload);
      axios.post('http://localhost:4000/ticket', payload)
      .then(res => {
        commit("addticket", res.data);
      })
      .catch(err => {
        console.error(err); 
      })  
    },
    updateTicket({commit}, payload){
      axios.put(`http://localhost:4000/ticket/${payload.ticketId}`, payload.ticketData)
      .then(res => {
        //commit("cleartickets");
        console.log(res.data.id);
      })
      .catch(err => {
        console.error(err); 
      })  
    },
    downloadFile({commit}, payload){
      console.log(payload);
      var url = `http://localhost:4000/ticket/${payload}`; 
      window.open(url, '_blank');
    },
    changeticket({commit}, payload) {
      commit("changeticket", payload);
    },
    fetchTickets({ commit }) {
      axios.get('http://localhost:4000/ticket')
      .then(res => {
        console.log(res.data)     
        commit('fetchTickets', res.data)
      })
      .catch(err => {
        console.error(err); 
      })  
    }
  },

  getters: {
    tickets(state) {
      return state.tickets;
    },
    currentticket(state) {
      return state.currentticket;
    }
  
}
};
