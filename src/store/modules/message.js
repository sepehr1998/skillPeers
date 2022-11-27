import {sendNewMessage, countMessages, getMessages,getMessageByID} from "@/api/message";

const state = {};

const mutations = {};

const actions = {
    countMessages(context, param) {
        return new Promise((resolve, reject) => {
            countMessages(param)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.warn("failed to get messages count", err);
                    reject(err);
                });
        });
    },
    getMessages(context, param) {
        return new Promise((resolve, reject) => {
            getMessages(param)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.warn("failed to get messages", err);
                    reject(err);
                });
        });
    },
    sendNewMessage(context, param) {
        return new Promise((resolve, reject) => {
            sendNewMessage(param)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.warn("failed to send message", err);
                    reject(err);
                });
        });
    },

    getMessageByID(context, id) {
        return new Promise((resolve, reject) => {
            getMessageByID(id)
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
