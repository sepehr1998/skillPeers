import {
  login,
  logout,
  getInfo,
  registerNewUser,
  confirmEmail,
  sendOtp,
  updateProfile,
  resetPassword,
  changePassword,
} from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const state = {
  token: getToken(),
  refereshToken: "",
  creationTime: "",
  account: {},
  permissions: [],
  superAdmin: false,
  profile: {},
  skills: [],
  user: {},
  educations: [],
  experiments: [],
  hourRates: [],
  ttl: 0,
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_REFERESH_TOKEN: (state, refereshToken) => {
    state.refereshToken = refereshToken;
  },
  SET_CREATION_TIME: (state, creationTime) => {
    state.creationTime = creationTime;
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account;
  },
  SET_SUPER_ADMIN: (state, superAdmin) => {
    state.superAdmin = superAdmin === true;
  },
  SET_TTL: (state, ttl) => {
    state.ttl = ttl;
  },
  SET_PROFILE: (state, profile) => {
    state.profile = profile;
  },
  SET_SKILLS: (state, skills) => {
    state.skills = skills;
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
  SET_PERMISSION: (state, permissions) => {
    state.permissions = permissions;
  },

  SET_EDUCATION: (state, educations) => {
    state.educations = educations;
  },
  SET_EXPERIMENT: (state, experiments) => {
    state.experiments = experiments;
  },
  SET_HOUR_RATE: (state, hourRates) => {
    state.hourRates = hourRates;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, uniqueId, rememberUser } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password,
        uniqueId: uniqueId,
        clientType: "WEB",
      })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data["accessToken"]);
          setToken(data["accessToken"], rememberUser);
          commit("SET_REFERESH_TOKEN", data["refreshToken"]);
          commit("SET_CREATION_TIME", data["creationTime"]);
          commit("SET_ACCOUNT", data["account"]);
          commit("SET_SUPER_ADMIN", data["superAdmin"]);
          commit("SET_TTL", data["ttl"]);
          commit("SET_PERMISSION", data["permissions"]);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data || !data["user"] || !data["profile"]) {
            reject("Verification failed, please Login again.");
            return;
          }

          commit("SET_PROFILE", data.profile);
          commit("SET_SKILLS", data.skills);
          commit("SET_USER", data.user);
          commit("SET_EDUCATION", data.educations);
          commit("SET_EXPERIMENT", data.experiments);
          commit("SET_HOUR_RATE", data.hourRates);

          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_REFERESH_TOKEN", "");
          commit("SET_CREATION_TIME", "");
          commit("SET_ACCOUNT", {});
          commit("SET_SUPER_ADMIN", false);
          commit("SET_TTL", 0);
          commit("SET_PROFILE", {});
          commit("SET_SKILLS", []);
          commit("SET_USER", {});
          commit("SET_PERMISSION", []);
          commit("SET_EDUCATION", []);
          commit("SET_EXPERIMENT", []);
          commit("SET_HOUR_RATE", []);
          removeToken();
          resetRouter();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_REFERESH_TOKEN", "");
      commit("SET_CREATION_TIME", "");
      commit("SET_ACCOUNT", {});
      commit("SET_SUPER_ADMIN", false);
      commit("SET_TTL", 0);
      commit("SET_PROFILE", {});
      commit("SET_SKILLS", []);
      commit("SET_USER", {});
      commit("SET_PERMISSION", []);
      commit("SET_EDUCATION", []);
      commit("SET_EXPERIMENT", []);
      commit("SET_HOUR_RATE", []);

      removeToken();
      resolve();
    });
  },

  regist({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      registerNewUser({
        password: userInfo.password,
        passwordConfirm: userInfo.passwordConfirm,
        clientType: "WEB",
        uniqueId: userInfo.uniqueId,
        username: userInfo.userName.trim(),
        user: {
          mobile: userInfo.user.mobile,
          email: userInfo.user.email,
          legal: false,
          firstName: "",
          lastName: "",
          nationalId: "9824299012",
        },
        profile: {
          gender: "MALE",
          birthDate: "1990-06-13T16:27:56.658",
          education: "",
          expertise: "",
        },
      })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN", data["accessToken"]);
          setToken(data["accessToken"]);
          commit("SET_REFERESH_TOKEN", data["refreshToken"]);
          commit("SET_CREATION_TIME", data["creationTime"]);
          commit("SET_ACCOUNT", data["account"]);
          commit("SET_SUPER_ADMIN", data["superAdmin"]);
          commit("SET_TTL", data["ttl"]);
          commit("SET_PERMISSION", data["permissions"]);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  confirmEmail(args, code) {
    return new Promise((resolve, reject) => {
      confirmEmail({ input: code + "" })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.warn("Failed Confirming email", err);
          reject(err);
        });
    });
  },

  sendEmailOtp(arg, email) {
    return new Promise((resolve, reject) => {
      sendOtp({
        email: email,
        sendViaEmail: true,
        sendViaSms: false,
      })
        .then(() => {
          resolve();
        })
        .catch((err) => reject(err));
    });
  },

  updateUserProfile({ commit, rootGetters }, userInfo) {
    return new Promise((resolve, reject) => {
      let origUser = rootGetters.user;
      let origUserProfile = rootGetters.userProfile;
      console.log(userInfo);

      let profile = {};
      let user = {};
      let skills = rootGetters.userSkills;
      let educations = rootGetters.userEducations;
      let experiments = rootGetters.userExperiments;
      let hourRates = rootGetters.userHourRate;

      user.firstName = userInfo.firstName
        ? userInfo.firstName
        : origUser.firstName;

      user.mobile = userInfo.mobile ? userInfo.mobile : origUser.mobile;

      user.lastName = userInfo.lastName ? userInfo.lastName : origUser.lastName;
      user.languageIds = userInfo.languageIds ? userInfo.languageIds.map((lang) => lang.id) : origUser.languages.map((lang) => lang.id);
      user.email = origUser.email;
      user.legal = origUser.legal;

      profile.language = userInfo.language
        ? userInfo.language
        : origUserProfile.language;

      profile.birthDate = userInfo.birthDate
        ? userInfo.birthDate
        : origUserProfile.birthDate;

      profile.address = userInfo.address
        ? userInfo.address
        : origUserProfile.address;

      profile.countryId = userInfo.countryId
        ? userInfo.countryId
        : origUserProfile.countryId;

      profile.country = userInfo.country
        ? userInfo.country
        : origUserProfile.country;

      profile.cityId = userInfo.cityId
        ? userInfo.cityId
        : origUserProfile.cityId;
      profile.cityName = userInfo.cityName
          ? userInfo.cityName
          : origUserProfile.cityName;
      profile.city = userInfo.city ? userInfo.city : origUserProfile.city;

      profile.zipCode = userInfo.zipCode
        ? userInfo.zipCode
        : origUserProfile.zipCode;

      profile.linkedin = userInfo.linkedin
        ? userInfo.linkedin
        : origUserProfile.linkedin;

      profile.webSite = userInfo.webSite
        ? userInfo.webSite
        : origUserProfile.webSite;

      profile.bio = userInfo.bio ? userInfo.bio : origUserProfile.bio;

      educations = userInfo.educations ? userInfo.educations : educations;
      experiments = userInfo.experiments ? userInfo.experiments : experiments;

      //profile section

      profile.image = userInfo.image ? userInfo.image : origUserProfile.image;
      profile.background = userInfo.background ? userInfo.background : origUserProfile.background;
      console.log(userInfo.workSample1)
      profile.workSample1 = userInfo.workSample1 ? userInfo.workSample1 : origUserProfile.workSample1;
      profile.workSample2 = userInfo.workSample2 ? userInfo.workSample2 : origUserProfile.workSample2;

      //skill section
      if (userInfo.skills) {
        skills = userInfo.skills;
      }
      if (userInfo.hourRates) {
        hourRates = userInfo.hourRates;
      }

      // user section
      // user.legalName = origUser.legalName;

      console.log("Updating Profile with: ", {
        profile,
        skills,
        user,
        educations,
        experiments,
        hourRates,
      });

      updateProfile({
        profile,
        skills,
        user,
        educations,
        experiments,
        hourRates,
      })
        .then((response) => {
          console.log("Successfully updated user profile");
          const { data } = response;

          if (!data || !data["user"] || !data["profile"]) {
            reject("Verification failed, please Login again.");
            return;
          }

          commit("SET_PROFILE", data.profile);
          commit("SET_SKILLS", data.skills);
          commit("SET_USER", data.user);
          commit("SET_EDUCATION", data.educations);
          commit("SET_EXPERIMENT", data.experiments);
          commit("SET_HOUR_RATE", data.hourRates);

          resolve(data);
        })
        .catch((err) => {
          console.warn("Failed to update user profile ", err);
          reject(err);
        });
    });
  },

  addSkill({ dispatch, rootGetters }, newSkill) {
    return new Promise((resolve, reject) => {
      let skills = [...rootGetters.userSkills];
      skills.push(newSkill);
      dispatch("updateUserProfile", {
        skills,
      })
        .then(() => {
          console.log("new skill Successfully added");
          resolve();
        })
        .catch((err) => {
          console.warn("Failed to add new Skill to user", err);
          reject(err);
        });
    });
  },

  editSkill({ dispatch, rootGetters }, updateSkill) {
    return new Promise((resolve, reject) => {
      let skills = rootGetters.userSkills;
      let sendSkills = [];
      for (let s of skills) {
        if (s.skillId != updateSkill.skillId) {
          sendSkills.push(s);
        }
      }
      sendSkills.push(updateSkill);
      dispatch("updateUserProfile", {
        skills: sendSkills,
      })
          .then(() => {
            console.log("skill Successfully removed");
            resolve();
          })
          .catch((err) => {
            console.warn("Failed to add new Skill to user", err);
            reject(err);
          });
    });
  },

  removeSkill({ dispatch, rootGetters }, skillId) {
    return new Promise((resolve, reject) => {
      let skills = rootGetters.userSkills;
      let sendSkills = [];
      for (let s of skills) {
        if (s.skillId != skillId) {
          sendSkills.push(s);
        }
      }
      if (skills.length == sendSkills.length) resolve();
      else {
        dispatch("updateUserProfile", {
          skills: sendSkills,
        })
          .then(() => {
            console.log("skill Successfully removed");
            resolve();
          })
          .catch((err) => {
            console.warn("Failed to add new Skill to user", err);
            reject(err);
          });
      }
    });
  },

  restPassword(context, data) {
    return new Promise((resolve, reject) => {
      resetPassword(data)
        .then(() => {
          console.log("Successfully reset password");
          resolve();
        })
        .catch((err) => {
          console.warn("Failed reseting password");
          reject(err);
        });
    });
  },

  changePassword(context, data) {
    return new Promise((resolve, reject) => {
      changePassword(data)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          console.warn("Failed changing password: ", err);
          if (
            err &&
            err.response &&
            err.response.data &&
            err.response.data.length > 0
          )
            reject(err.response.data[0]);
          else {
            reject(err);
          }
        });
    });
  },

  addHourlyRate({ dispatch, rootGetters }, newHourRate) {
    return new Promise((resolve, reject) => {
      let hourRates = [...rootGetters.userHourRate];
      hourRates.push(newHourRate);

      console.log("all of the new hour rates: ", hourRates);

      dispatch("updateUserProfile", {
        hourRates,
      })
        .then(() => {
          console.log("new Hour rate Successfully added");
          resolve();
        })
        .catch((err) => {
          console.warn("Failed to add new hour rate to user", err);
          reject(err);
        });
    });
  },

  removeHourRates({ dispatch, rootGetters }, hourRateId) {
    return new Promise((resolve, reject) => {
      let hourRates = rootGetters.userHourRate;
      let sendHourRates = [];
      for (let s of hourRates) {
        if (s.id != hourRateId) {
          sendHourRates.push(s);
        }
      }
      if (hourRates.length == sendHourRates.length) resolve();
      else {
        dispatch("updateUserProfile", {
          hourRates: sendHourRates,
        })
          .then(() => {
            console.log("Hour rate Successfully removed");
            resolve();
          })
          .catch((err) => {
            console.warn("Failed to remove houre rate of user", err);
            reject(err);
          });
      }
    });
  },

  addExperiment({ dispatch, rootGetters }, newExperiment) {
    return new Promise((resolve, reject) => {
      let experiments = [...rootGetters.userExperiments];
      experiments.push(newExperiment);

      console.log("all of the new Experiments: ", experiments);

      dispatch("updateUserProfile", {
        experiments,
      })
        .then(() => {
          console.log("new Experiment Successfully added");
          resolve();
        })
        .catch((err) => {
          console.warn("Failed to add new Experiment to user", err);
          reject(err);
        });
    });
  },

  removeExperiment({ dispatch, rootGetters }, experimentId) {
    return new Promise((resolve, reject) => {
      let experiments = rootGetters.userExperiments;
      let sendExperiments = [];
      for (let s of experiments) {
        if (s.id != experimentId) {
          sendExperiments.push(s);
        }
      }
      if (sendExperiments.length == experiments.length) resolve();
      else {
        dispatch("updateUserProfile", {
          experiments: sendExperiments,
        })
          .then(() => {
            console.log("Experiment Successfully removed");
            resolve();
          })
          .catch((err) => {
            console.warn("Failed to remove Experiment of user", err);
            reject(err);
          });
      }
    });
  },

  addEducation({ dispatch, rootGetters }, newEducation) {
    return new Promise((resolve, reject) => {
      let educations = [...rootGetters.userEducations];
      educations.push(newEducation);

      console.log("all of the new Experiments: ", educations);

      dispatch("updateUserProfile", {
        educations,
      })
        .then(() => {
          console.log("new Education Successfully added");
          resolve();
        })
        .catch((err) => {
          console.warn("Failed to add new Education to user", err);
          reject(err);
        });
    });
  },

  removeEducation({ dispatch, rootGetters }, educationId) {
    return new Promise((resolve, reject) => {
      let educations = rootGetters.userEducations;
      let sendEducations = [];
      for (let s of educations) {
        if (s.id != educationId) {
          sendEducations.push(s);
        }
      }
      if (sendEducations.length == educations.length) resolve();
      else {
        dispatch("updateUserProfile", {
          educations: sendEducations,
        })
          .then(() => {
            console.log("Education Successfully removed");
            resolve();
          })
          .catch((err) => {
            console.warn("Failed to remove Education of user", err);
            reject(err);
          });
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
