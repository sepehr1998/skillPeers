import { getAllSkills, createSkill } from "@/api/skill";

const state = {};

const mutations = {};

const actions = {
  getAllSkills() {
    return new Promise((resolve, reject) => {
      getAllSkills()
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
  createSkill(context, params) {
    return new Promise((resolve, reject) => {
      createSkill(params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.warn("Failed Creating new Skill", err);
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
