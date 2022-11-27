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
        console.log("Show Under Construction modal");
        commit("SHOW_MODAL");
    },
    hideModal({ commit }) {
        console.log("Hide Under Construction modal");
        commit("HIDE_MODAL");
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
