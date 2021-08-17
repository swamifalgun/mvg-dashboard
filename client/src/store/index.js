import Vuex from "vuex";
import Vue from "vue";

import MvgService from "../mvgService";

Vue.use(Vuex);

const state = {
  trams: [],
  ubahns: [],
};

let mutations = {
  setTramStatus(state, data) {
    state.trams = data.trams;
  },
  setUbahnStatus(state, data) {
    state.ubahns = data.ubahns;
  },
};

let getters = {
  getTrams() {
    return state.trams;
  },
  getUbahns() {
    return state.ubahns;
  },
};

const actions = {
  fetchTramStatus(context, data) {
    const promise = MvgService.getTramStatus();

    promise.then((status) => {
      data = status;
      context.commit("setTramStatus", data);
    });
  },
  fetchUbahnStatus(context, data) {
    const promise = MvgService.getUbahnStatus();

    promise.then((status) => {
      data = status;
      context.commit("setUbahnStatus", data);
    });
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {},
});
