import {addRate, getRateByID} from "@/api/rate";

const state = {};

const mutations = {};

const actions = {
    addRate(context, param) {
        return new Promise((resolve, reject) => {
            addRate(param)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.warn("failed to add rate", err);
                    reject(err);
                });
        });
    },

    searchRateByID(context, id) {
        return new Promise((resolve, reject) => {
            getRateByID(id)
                .then((res) => {
                    console.log("Search by id result: ", res);
                    resolve(res.data);
                })
                .catch((err) => {
                    console.warn("failed loading search data ", err);
                    reject(err);
                });
        });
    },


};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
