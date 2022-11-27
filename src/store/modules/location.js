import { searchCountries } from "@/api/location";
import { searchLanguages } from "@/api/location";
import { searchCities } from "@/api/location";

const state = {};

const mutations = {};

const actions = {
  getCountries(context, data) {
    return new Promise((resolve, reject) => {
      searchCountries(data)
        .then((result) => {
          if (result && result.data) {
            resolve(result.data);
          }
          resolve();
        })
        .catch((err) => {
          console.warn("unable to load Skills", err);
          reject(err);
        });
    });
  },
  getLanguages(context, data) {
    return new Promise((resolve, reject) => {
      searchLanguages(data)
        .then((result) => {
          if (result && result.data) {
            resolve(result.data);
          }
          resolve();
        })
        .catch((err) => {
          console.warn("unable to load Skills", err);
          reject(err);
        });
    });
  },
    getCities(context, data) {
        return new Promise((resolve, reject) => {
            searchCities(data)
                .then((result) => {
                    if (result && result.data) {
                        resolve(result.data);
                    }
                    resolve();
                })
                .catch((err) => {
                    console.warn("unable to load Skills", err);
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
