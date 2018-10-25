import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: ''
  },
  mutations: {
    SET_USER_AND_TOKEN(state, data) {
      state.user = data.user;
      state.token = data.token;
    }
  },
  actions: {
    login({ commit }, data) {
      commit('SET_USER_AND_TOKEN', data);
    }
  }
});
