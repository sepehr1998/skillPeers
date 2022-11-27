import {sendMessage} from "@/api/contactus";

const state = {};

const mutations = {};

const actions = {

    sendMessage(context, param) {
        return new Promise((resolve, reject) => {
            sendMessage(param)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.warn("failed to send message", err);
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
