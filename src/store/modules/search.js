import {searchUsers, searchSkills, searchUserByID, countUsers} from "@/api/search";

const state = {};

const mutations = {};

const actions = {
    searchUsers(context, param) {
        return new Promise((resolve, reject) => {
            searchUsers(param)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.warn("failed loading search data ", err);
                    reject(err);
                });
        });
    },
    countUsers(context, param) {
        return new Promise((resolve, reject) => {
            countUsers(param)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.warn("failed loading search data ", err);
                    reject(err);
                });
        });
    },
    searchSkills(context, param) {
        return new Promise((resolve, reject) => {
            searchSkills(param)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.warn("failed loading search data ", err);
                    reject(err);
                });
        });
    },

    searchUserById(context, id) {
        return new Promise((resolve, reject) => {
            console.log("Searching for id:", id);
            searchUserByID(id)
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
