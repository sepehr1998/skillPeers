const state = {
    showConstructionModal: false,
};

const mutations = {
    SHOW_MODAL: (state) => {
        state.showConstructionModal = true;
    },
    HIDE_MODAL: (state) => {
        state.showConstructionModal = false;
    },
};

const actions = {
    showModal({ commit }) {
        commit("SHOW_MODAL");
    },
    hideModal({ commit }) {
        commit("HIDE_MODAL");
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
