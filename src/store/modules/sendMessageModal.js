const state = {
  showModal: false,
};

const mutations = {
  SHOW_MODAL: (state) => {
    state.showModal = true;
  },
  HIDE_MODAL: (state) => {
    state.showModal = false;
  },
};

const actions = {
  showModal({ commit }) {
    console.log("Show Message modal");
    commit("SHOW_MODAL");
  },
  hideModal({ commit }) {
    console.log("Hide Message modal");
    commit("HIDE_MODAL");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
